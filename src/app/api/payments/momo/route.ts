export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaymentStatus, isValidMomoNumber, requestToPay, toMsisdn } from '@/lib/momo';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projectSlug = String(body.projectSlug || '').trim();
    const phoneNumber = String(body.phoneNumber || '').trim();

    if (!projectSlug || !phoneNumber) {
      return NextResponse.json(
        { error: 'A project and MTN phone number are required.' },
        { status: 400 }
      );
    }

    if (!isValidMomoNumber(phoneNumber)) {
      return NextResponse.json(
        { error: 'Enter a valid MTN Rwanda number, for example 078xxxxxxx.' },
        { status: 400 }
      );
    }

    const project = await prisma.project.findUnique({ where: { slug: projectSlug } });

    if (!project || project.status !== 'PUBLISHED') {
      return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
    }

    if (!project.isPurchasable || project.price <= 0) {
      return NextResponse.json(
        { error: 'This product is not available for direct purchase. Please contact us.' },
        { status: 400 }
      );
    }

    const externalId = `HHT-${Date.now()}`;
    const { referenceId } = await requestToPay({
      amount: project.price,
      currency: project.currency,
      phoneNumber,
      externalId,
      payerMessage: `Purchase: ${project.title}`,
    });

    await prisma.momoPayment.create({
      data: {
        referenceId,
        projectId: project.id,
        phoneNumber: toMsisdn(phoneNumber),
        customerName: body.customerName ? String(body.customerName).trim() : null,
        customerEmail: body.customerEmail ? String(body.customerEmail).trim() : null,
        amount: project.price,
        currency: project.currency,
      },
    });

    return NextResponse.json({ referenceId, status: 'PENDING' }, { status: 202 });
  } catch (error) {
    console.error('MoMo payment request failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to start the MoMo payment.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const referenceId = new URL(request.url).searchParams.get('reference');

  if (!referenceId) {
    return NextResponse.json({ error: 'A payment reference is required.' }, { status: 400 });
  }

  try {
    const payment = await prisma.momoPayment.findUnique({
      where: { referenceId },
      include: { project: true },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found.' }, { status: 404 });
    }

    const { status, reason } = await getPaymentStatus(referenceId);

    if (status !== 'PENDING' && payment.status === 'PENDING') {
      await prisma.momoPayment.update({
        where: { referenceId },
        data: {
          status: status === 'SUCCESSFUL' ? 'COMPLETED' : 'FAILED',
          providerNote: reason || null,
        },
      });
    }

    return NextResponse.json({
      status,
      reason: reason || null,
      downloadUrl: status === 'SUCCESSFUL' ? payment.project.downloadFolder : null,
    });
  } catch (error) {
    console.error('MoMo status check failed:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to check the payment status.' },
      { status: 500 }
    );
  }
}
