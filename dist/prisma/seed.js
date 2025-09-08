"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Start seeding...');
    const jobsData = [
        {
            title: 'Frontend Developer (React)',
            description: 'Join our team to build amazing user interfaces with React and Next.js. 3+ years of experience required.',
            companyName: 'Innovatech Solutions',
            location: 'Remote',
        },
        {
            title: 'Backend Engineer (Node.js)',
            description: 'We are looking for a skilled backend engineer to design and implement our server-side logic using Node.js, NestJS, and PostgreSQL.',
            companyName: 'DataCore Systems',
            location: 'New York, NY',
        },
        {
            title: 'Full-Stack Developer',
            description: 'Work on both the frontend and backend of our flagship product. A great opportunity to grow your skills across the entire stack.',
            companyName: 'Innovatech Solutions',
            location: 'San Francisco, CA',
        },
    ];
    for (const job of jobsData) {
        await prisma.job.upsert({
            where: {
                title_companyName: { title: job.title, companyName: job.companyName },
            },
            update: {},
            create: job,
        });
    }
    console.log('Jobs seeded.');
    const resourcesData = [
        {
            title: 'Official React Documentation',
            url: 'https://react.dev/',
            description: 'The best place to start learning React.',
            type: client_1.ResourceType.ARTICLE,
        },
        {
            title: 'NestJS: A progressive Node.js framework',
            url: 'https://nestjs.com/',
            description: 'The official documentation for NestJS.',
            type: client_1.ResourceType.ARTICLE,
        },
        {
            title: 'FreeCodeCamp: Relational Database Course',
            url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
            description: 'A comprehensive video course on SQL and relational databases.',
            type: client_1.ResourceType.VIDEO,
        },
    ];
    for (const resource of resourcesData) {
        await prisma.resource.upsert({
            where: { url: resource.url },
            update: {},
            create: resource,
        });
    }
    console.log('Resources seeded.');
    console.log('Seeding finished.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map