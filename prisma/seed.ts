/* eslint-disable @typescript-eslint/no-misused-promises */
// import { PrismaClient, ResourceType } from '@prisma/client';

// // Initialize the Prisma Client
// const prisma = new PrismaClient();

// async function main() {
//   console.log('Start seeding...');

//   // --- Create Dummy Jobs ---
//   const jobsData = [
//     {
//       title: 'Frontend Developer (React)',
//       description:
//         'Join our team to build amazing user interfaces with React and Next.js. 3+ years of experience required.',
//       companyName: 'Innovatech Solutions',
//       location: 'Remote',
//     },
//     {
//       title: 'Backend Engineer (Node.js)',
//       description:
//         'We are looking for a skilled backend engineer to design and implement our server-side logic using Node.js, NestJS, and PostgreSQL.',
//       companyName: 'DataCore Systems',
//       location: 'New York, NY',
//     },
//     {
//       title: 'Full-Stack Developer',
//       description:
//         'Work on both the frontend and backend of our flagship product. A great opportunity to grow your skills across the entire stack.',
//       companyName: 'Innovatech Solutions',
//       location: 'San Francisco, CA',
//     },
//   ];

//   for (const job of jobsData) {
//     // Using "upsert" to avoid creating duplicate jobs if the script is run again
//     await prisma.job.upsert({
//       where: {
//         title_companyName: { title: job.title, companyName: job.companyName },
//       }, // Assumes a job is unique by its title and company
//       update: {},
//       create: job,
//     });
//   }
//   console.log('Jobs seeded.');

//   // --- Create Dummy Resources ---
//   const resourcesData = [
//     {
//       title: 'Official React Documentation',
//       url: 'https://react.dev/',
//       description: 'The best place to start learning React.',
//       type: ResourceType.ARTICLE,
//     },
//     {
//       title: 'NestJS: A progressive Node.js framework',
//       url: 'https://nestjs.com/',
//       description: 'The official documentation for NestJS.',
//       type: ResourceType.ARTICLE,
//     },
//     {
//       title: 'FreeCodeCamp: Relational Database Course',
//       url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
//       description:
//         'A comprehensive video course on SQL and relational databases.',
//       type: ResourceType.VIDEO,
//     },
//   ];

//   for (const resource of resourcesData) {
//     // Using "upsert" with the unique URL to prevent duplicates
//     await prisma.resource.upsert({
//       where: { url: resource.url },
//       update: {},
//       create: resource,
//     });
//   }
//   console.log('Resources seeded.');

//   console.log('Seeding finished.');
// }

// // Execute the main function
// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     // Close the Prisma Client connection
//     await prisma.$disconnect();
//   });

import { PrismaClient, ResourceType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // --- 1. Create Dummy Skills ---
  // Using upsert to avoid creating duplicates if the script is run again.
  console.log("Seeding skills...");
  const reactSkill = await prisma.skill.upsert({
    where: { name: "React" },
    update: {},
    create: { name: "React" },
  });

  const typescriptSkill = await prisma.skill.upsert({
    where: { name: "TypeScript" },
    update: {},
    create: { name: "TypeScript" },
  });

  const nodejsSkill = await prisma.skill.upsert({
    where: { name: "Node.js" },
    update: {},
    create: { name: "Node.js" },
  });

  const sqlSkill = await prisma.skill.upsert({
    where: { name: "SQL" },
    update: {},
    create: { name: "SQL" },
  });

  const nestjsSkill = await prisma.skill.upsert({
    where: { name: "NestJS" },
    update: {},
    create: { name: "NestJS" },
  });
  console.log("Skills seeded.");

  // --- 2. Create Dummy Jobs & Resources (as before) ---
  console.log("Seeding jobs and resources...");
  const job1 = await prisma.job.upsert({
    where: {
      title_companyName: {
        title: "Frontend Developer (React)",
        companyName: "Innovatech Solutions",
      },
    },
    update: {},
    create: {
      title: "Frontend Developer (React)",
      description:
        "Join our team to build amazing user interfaces with React and Next.js. 3+ years of experience required.",
      companyName: "Innovatech Solutions",
      location: "Remote",
    },
  });

  const job2 = await prisma.job.upsert({
    where: {
      title_companyName: {
        title: "Backend Engineer (Node.js)",
        companyName: "DataCore Systems",
      },
    },
    update: {},
    create: {
      title: "Backend Engineer (Node.js)",
      description:
        "We are looking for a skilled backend engineer to design and implement our server-side logic using Node.js, NestJS, and PostgreSQL.",
      companyName: "DataCore Systems",
      location: "New York, NY",
    },
  });

  const resource1 = await prisma.resource.upsert({
    where: { url: "https://react.dev/" },
    update: {},
    create: {
      title: "Official React Documentation",
      url: "https://react.dev/",
      description: "The best place to start learning React.",
      type: ResourceType.ARTICLE,
    },
  });

  const resource2 = await prisma.resource.upsert({
    where: { url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
    update: {},
    create: {
      title: "FreeCodeCamp: Relational Database Course",
      url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
      description:
        "A comprehensive video course on SQL and relational databases.",
      type: ResourceType.VIDEO,
    },
  });
  console.log("Jobs and resources seeded.");

  // --- 3. Link Skills to Jobs and Resources ---
  console.log("Linking skills to jobs and resources...");
  await prisma.jobSkill.createMany({
    data: [
      // Link Frontend job to React & TypeScript
      { jobId: job1.id, skillId: reactSkill.id },
      { jobId: job1.id, skillId: typescriptSkill.id },
      // Link Backend job to Node.js & NestJS
      { jobId: job2.id, skillId: nodejsSkill.id },
      { jobId: job2.id, skillId: nestjsSkill.id },
    ],
    skipDuplicates: true, // Prevents errors if a link already exists
  });

  await prisma.resourceSkill.createMany({
    data: [
      // Link React resource to React skill
      { resourceId: resource1.id, skillId: reactSkill.id },
      // Link Database resource to SQL skill
      { resourceId: resource2.id, skillId: sqlSkill.id },
    ],
    skipDuplicates: true, // Prevents errors if a link already exists
  });
  console.log("Links seeded.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
