import { NextResponse } from 'next/server';

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

    // Here you can integrate database logging (e.g., PostgreSQL/Prisma/MongoDB)
    // or send notification emails via Resend / SendGrid / Nodemailer.
    console.log('Received Assessment Request:', {
      fullName,
      email,
      phone,
      company,
      serviceType,
      projectOverview,
      timestamp: new Date().toISOString()
    });

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
