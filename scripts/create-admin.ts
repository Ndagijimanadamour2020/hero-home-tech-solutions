// scripts/create-admin.ts
import { prisma } from '../src/lib/prisma';
import bcrypt from 'bcryptjs';

async function createAdmin() {
  const username = 'admin';
  const rawPassword = 'admin123';

  // Generate fresh hash
  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  try {
    const user = await prisma.user.upsert({
      where: { username },
      update: {
        password: rawPassword, // Supports plain-text check fallback
        passwordHash: hashedPassword, // Supports bcrypt check
        role: 'ADMIN',
      },
      create: {
        username,
        password: rawPassword,
        passwordHash: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log('----------------------------------------');
    console.log('SUCCESS: Admin user configured!');
    console.log(`Username: ${user.username}`);
    console.log(`Password: ${rawPassword}`);
    console.log('----------------------------------------');
  } catch (error) {
    console.error('ERROR creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();