import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('damour123', 10);

  // Seed default admin user
  await prisma.user.upsert({
    where: { username: 'damour' },
    update: {},
    create: {
      username: 'damour',
      password: hashedPassword,
      email: 'damour@herohometech.com',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });