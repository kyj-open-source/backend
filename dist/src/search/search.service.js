"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../prisma/prisma.service");
let SearchService = class SearchService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchAll(query) {
        const userId = "d9a8b7a6-e5f4-g3h2-i1j0-k9l8m7n6o5p4";
        if (!query) {
            return { jobs: [], resources: [] };
        }
        const [savedJobs, savedResources] = await Promise.all([
            this.prisma.savedJob.findMany({
                where: { userId },
                select: { jobId: true },
            }),
            this.prisma.savedResource.findMany({
                where: { userId },
                select: { resourceId: true },
            }),
        ]);
        const savedJobIds = new Set(savedJobs.map((job) => job.jobId));
        const savedResourceIds = new Set(savedResources.map((item) => item.resourceId));
        const jobSearchFilter = {
            OR: [
                { title: { contains: query, mode: client_1.Prisma.QueryMode.insensitive } },
                {
                    description: { contains: query, mode: client_1.Prisma.QueryMode.insensitive },
                },
            ],
        };
        const resourceSearchFilter = {
            OR: [
                { title: { contains: query, mode: client_1.Prisma.QueryMode.insensitive } },
                {
                    description: { contains: query, mode: client_1.Prisma.QueryMode.insensitive },
                },
            ],
        };
        const [jobs, resources] = await Promise.all([
            this.prisma.job.findMany({
                where: jobSearchFilter,
                take: 20,
                select: {
                    id: true,
                    title: true,
                    companyName: true,
                    location: true,
                    skills: {
                        select: {
                            skill: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            }),
            this.prisma.resource.findMany({
                where: resourceSearchFilter,
                take: 20,
                select: {
                    id: true,
                    title: true,
                    url: true,
                    type: true,
                    skills: {
                        select: {
                            skill: {
                                select: {
                                    id: true,
                                    name: true,
                                },
                            },
                        },
                    },
                },
            }),
        ]);
        const formattedJobs = jobs.map((job) => ({
            ...job,
            skills: job.skills.map((jobSkill) => jobSkill.skill),
            isSaved: savedJobIds.has(job.id),
        }));
        const formattedResources = resources.map((resource) => ({
            ...resource,
            skills: resource.skills.map((resourceSkill) => resourceSkill.skill),
            isSaved: savedResourceIds.has(resource.id),
        }));
        return { jobs: formattedJobs, resources: formattedResources };
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map