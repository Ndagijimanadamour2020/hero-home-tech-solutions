import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';

export async function POST(request: Request) {
  const authenticated = await isAdmin();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { leadId, email, message } = await request.json();

  if (!email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Integrate your email provider here (e.g. Resend, Nodemailer, SendGrid)
  console.log(`Sending response to ${email} for Lead #${leadId}: ${message}`);

  return NextResponse.json({ success: true, message: 'Response sent successfully' });
}