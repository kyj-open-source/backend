import { PrismaClient, ResourceType } from '@prisma/client';

// Initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // --- Create Dummy Jobs ---
  const jobsData = [
    {
      title: 'Frontend Developer (React)',
      description:
        'Join our team to build amazing user interfaces with React and Next.js. 3+ years of experience required.',
      companyName: 'Innovatech Solutions',
      location: 'Remote',
    },
    {
      title: 'Backend Engineer (Node.js)',
      description:
        'We are looking for a skilled backend engineer to design and implement our server-side logic using Node.js, NestJS, and PostgreSQL.',
      companyName: 'DataCore Systems',
      location: 'New York, NY',
    },
    {
      title: 'Full-Stack Developer',
      description:
        'Work on both the frontend and backend of our flagship product. A great opportunity to grow your skills across the entire stack.',
      companyName: 'Innovatech Solutions',
      location: 'San Francisco, CA',
    },
  ];

  for (const job of jobsData) {
    // Using "upsert" to avoid creating duplicate jobs if the script is run again
    await prisma.job.upsert({
      where: {
        title_companyName: { title: job.title, companyName: job.companyName },
      }, // Assumes a job is unique by its title and company
      update: {},
      create: job,
    });
  }
  console.log('Jobs seeded.');

  // --- Create Dummy Resources ---
  const resourcesData = [
    {
      title: 'Official React Documentation',
      url: 'https://react.dev/',
      description: 'The best place to start learning React.',
      type: ResourceType.ARTICLE,
    },
    {
      title: 'NestJS: A progressive Node.js framework',
      url: 'https://nestjs.com/',
      description: 'The official documentation for NestJS.',
      type: ResourceType.ARTICLE,
    },
    {
      title: 'FreeCodeCamp: Relational Database Course',
      url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
      description:
        'A comprehensive video course on SQL and relational databases.',
      type: ResourceType.VIDEO,
    },
  ];

  for (const resource of resourcesData) {
    // Using "upsert" with the unique URL to prevent duplicates
    await prisma.resource.upsert({
      where: { url: resource.url },
      update: {},
      create: resource,
    });
  }
  console.log('Resources seeded.');

  console.log('Seeding finished.');
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  });
