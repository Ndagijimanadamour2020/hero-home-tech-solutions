import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, newPassword } = await request.json();

    if (!username || !newPassword) {
      return NextResponse.json(
        { error: 'Username and new password are required.' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Synchronize both fields globally in the database
    await prisma.user.update({
      where: { username },
      data: {
        password: newPassword,       // Plain-text fallback match
        passwordHash: hashedPassword, // Bcrypt hash match
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Password updated globally across the system. You can now sign in.',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reset password.' },
      { status: 500 }
    );
  }
}