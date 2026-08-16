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

  const solutions = [
    { slug: 'business-systems', title: 'Custom Business Systems', tagline: 'Turn manual operations into one dependable workflow.', problem: 'Disconnected spreadsheets, paper processes, and slow hand-offs limit visibility and growth.', solution: 'We design secure CRM, ERP, POS, and operations platforms around the way your team actually works.', features: ['Role-based dashboards', 'Workflow automation', 'Reporting and integrations'], benefits: ['Fewer manual errors', 'Faster decisions', 'A scalable operating system'], targetAudience: 'Growing businesses with complex operational workflows', icon: 'LayoutDashboard' },
    { slug: 'ai-automation', title: 'AI & Workflow Automation', tagline: 'Give your team more time for the work that matters.', problem: 'Repetitive customer, document, and data tasks consume capacity and delay service.', solution: 'We connect practical AI assistants and automations to your existing business processes.', features: ['AI support assistants', 'Document processing', 'System integrations'], benefits: ['24/7 responsiveness', 'Lower operating costs', 'Consistent service delivery'], targetAudience: 'Teams ready to automate high-volume work', icon: 'Bot' },
    { slug: 'digital-platforms', title: 'Web Platforms & SaaS', tagline: 'Launch a fast, credible product built to grow.', problem: 'Off-the-shelf sites and fragile tools cannot support ambitious digital products.', solution: 'We build modern customer portals, marketplaces, and SaaS products with reliable infrastructure.', features: ['Next.js applications', 'Payments and mobile money', 'Secure APIs'], benefits: ['Faster launch', 'Better conversion', 'Room to scale'], targetAudience: 'Founders and organizations launching digital services', icon: 'Rocket' },
  ];
  for (const solution of solutions) {
    await prisma.solution.upsert({ where: { slug: solution.slug }, update: solution, create: solution });
  }

  const businessSystems = await prisma.solution.findUnique({ where: { slug: 'business-systems' } });
  await prisma.caseStudy.upsert({
    where: { slug: 'ubuzima-commerce' },
    update: {},
    create: { slug: 'ubuzima-commerce', title: 'Ubuzima Hybrid Marketing E-Commerce', clientName: 'Ubuzima Hybrid Marketing Ltd', challenge: 'The business needed a reliable way to manage orders, inventory, and localized payments.', solution: 'A tailored e-commerce engine with operational visibility and integrated payment workflows.', features: ['Real-time stock management', 'Localized checkout', 'Order operations dashboard'], technologies: ['Node.js', 'React', 'PostgreSQL', 'Paypack API'], impact: ['Streamlined order management', 'Localized payment conversion'], solutionId: businessSystems?.id },
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
