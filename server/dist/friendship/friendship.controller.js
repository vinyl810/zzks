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
exports.FriendshipController = void 0;
const common_1 = require("@nestjs/common");
const friendship_service_1 = require("./friendship.service");
const friendship_dto_1 = require("./dto/friendship.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const users_service_1 = require("../users/users.service");
let FriendshipController = class FriendshipController {
    constructor(friendshipService, usersService) {
        this.friendshipService = friendshipService;
        this.usersService = usersService;
    }
    async add(body, req) {
        const user = req.user;
        const fromUser = await this.usersService.findOne(user.id);
        const toUser = await this.usersService.findOne(body.to_id);
        if (!fromUser || !toUser)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.BAD_REQUEST);
        const exists = await this.friendshipService.findOneByFromTo(fromUser, toUser);
        console.log("body: ", body);
        console.log("exists: ", exists);
        if (!exists)
            return this.friendshipService.create({
                fromId: user.id,
                toId: body.to_id,
            });
        else
            throw new common_1.HttpException("Friendship already exists", common_1.HttpStatus.BAD_REQUEST);
    }
    async userFriends(req) {
        const user = req.user;
        const fromUser = await this.usersService.findOne(user.id);
        if (!fromUser)
            throw new common_1.HttpException("User not found", common_1.HttpStatus.BAD_REQUEST);
        return this.friendshipService.findFriends(fromUser);
    }
};
exports.FriendshipController = FriendshipController;
__decorate([
    (0, common_1.Post)("add"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [friendship_dto_1.FriendshipRequestDto, Object]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "add", null);
__decorate([
    (0, common_1.Get)("userfriends"),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FriendshipController.prototype, "userFriends", null);
exports.FriendshipController = FriendshipController = __decorate([
    (0, common_1.Controller)("friendship"),
    __metadata("design:paramtypes", [friendship_service_1.FriendshipService,
        users_service_1.UsersService])
], FriendshipController);
//# sourceMappingURL=friendship.controller.js.map