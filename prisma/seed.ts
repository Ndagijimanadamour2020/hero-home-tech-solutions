import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "damour";
  const rawPassword = process.env.ADMIN_PASSWORD || "damour123";

  const passwordHash = await bcrypt.hash(rawPassword, 12);

  await prisma.user.upsert({
    where: { username },
    update: {
      password: passwordHash,
      passwordHash,
    },
    create: {
      username,
      password: passwordHash,
      passwordHash,
      role: 'ADMIN',
    },
  });

  const defaultCategories = [
    { name: 'Business Websites', slug: 'business-websites', description: 'High-performance web applications' },
    { name: 'Inventory & POS Systems', slug: 'inventory-pos', description: 'Stock tracking & retail management' },
    { name: 'AI & Automation', slug: 'ai-automation', description: 'Automated assistants & smart tools' },
    { name: 'Enterprise Software', slug: 'enterprise-software', description: 'Custom enterprise software solutions' },
  ];

  for (const cat of defaultCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { description: cat.description },
      create: cat,
    });
  }

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });