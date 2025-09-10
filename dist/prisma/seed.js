"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log("Start seeding...");
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
            description: "Join our team to build amazing user interfaces with React and Next.js. 3+ years of experience required.",
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
            description: "We are looking for a skilled backend engineer to design and implement our server-side logic using Node.js, NestJS, and PostgreSQL.",
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
            type: client_1.ResourceType.ARTICLE,
        },
    });
    const resource2 = await prisma.resource.upsert({
        where: { url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
        update: {},
        create: {
            title: "FreeCodeCamp: Relational Database Course",
            url: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            description: "A comprehensive video course on SQL and relational databases.",
            type: client_1.ResourceType.VIDEO,
        },
    });
    console.log("Jobs and resources seeded.");
    console.log("Linking skills to jobs and resources...");
    await prisma.jobSkill.createMany({
        data: [
            { jobId: job1.id, skillId: reactSkill.id },
            { jobId: job1.id, skillId: typescriptSkill.id },
            { jobId: job2.id, skillId: nodejsSkill.id },
            { jobId: job2.id, skillId: nestjsSkill.id },
        ],
        skipDuplicates: true,
    });
    await prisma.resourceSkill.createMany({
        data: [
            { resourceId: resource1.id, skillId: reactSkill.id },
            { resourceId: resource2.id, skillId: sqlSkill.id },
        ],
        skipDuplicates: true,
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
//# sourceMappingURL=seed.js.map