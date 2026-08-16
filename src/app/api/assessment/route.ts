export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, company, serviceType, projectOverview } = body;

    if (!fullName || !email || !projectOverview) {
      return NextResponse.json(
        { error: 'Please provide all required fields (Name, Email, Project Overview).' },
        { status: 400 }
      );
    }

    await prisma.lead.create({ data: {
      name: String(fullName).trim(), email: String(email).trim().toLowerCase(), phone: String(phone || '').trim(),
      business: String(company || 'Not provided').trim(), type: String(serviceType || 'CONSULTATION'), message: String(projectOverview).trim(),
    }});
    await prisma.analyticsEvent.create({ data: { eventName: 'lead_submitted', page: '/', meta: { serviceType } } });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for reaching out to Hero Home Tech Solutions! We will review your project details and contact you within 24 hours.' 
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error processing your request. Please try again later.' },
      { status: 500 }
    );
  }
}
