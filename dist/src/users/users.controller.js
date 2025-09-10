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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const add_skill_dto_1 = require("./dto/add-skill.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    getMySkills() {
        const userId = "d9a8b7c6-e5f4-g3h2-i1j0-k9l8m7n6o5p4";
        return this.usersService.getUserSkills(userId);
    }
    addSkillToProfile(addSkillDto) {
        const userId = "d9a8b7c6-e5f4-g3h2-i1j0-k9l8m7n6o5p4";
        return this.usersService.addSkillToUser(userId, addSkillDto.skillId);
    }
    removeSkillFromProfile(skillId) {
        const userId = "d9a8b7c6-e5f4-g3h2-i1j0-k9l8m7n6o5p4";
        return this.usersService.removeSkillFromUser(userId, skillId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)("skills"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getMySkills", null);
__decorate([
    (0, common_1.Post)("skills"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_skill_dto_1.AddSkillDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addSkillToProfile", null);
__decorate([
    (0, common_1.Delete)("skills/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeSkillFromProfile", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)("me"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map