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
exports.FriendshipService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const friendship_entity_1 = require("./friendship.entity");
const users_service_1 = require("../users/users.service");
let FriendshipService = class FriendshipService {
    constructor(friendshipRepository, usersService) {
        this.friendshipRepository = friendshipRepository;
        this.usersService = usersService;
    }
    findAllRelated(user) {
        return this.friendshipRepository.find({
            where: [{ from: user }, { to: user }],
            relations: ["from", "to"],
        });
    }
    findOneByFromTo(from, to) {
        return this.friendshipRepository.findOneBy({ from: from, to: to });
    }
    async findFriends(user) {
        const friendships = await this.findAllRelated(user);
        const friends = friendships.map((friendship) => {
            console.log(friendship.from);
            if (friendship.from.id === user.id)
                return friendship.to;
            else
                return friendship.from;
        });
        return friends;
    }
    async findAllByTo(to) {
        return this.friendshipRepository.find({
            where: { to },
        });
    }
    async create(friendshipDto) {
        const friendship = new friendship_entity_1.Friendship();
        friendship.from = await this.usersService.findOne(friendshipDto.fromId);
        friendship.to = await this.usersService.findOne(friendshipDto.toId);
        console.log("friendship create: ", friendship);
        return this.friendshipRepository.save(friendship);
    }
    async remove(id) {
        await this.friendshipRepository.delete(id);
    }
    async removeByFrom(from) {
        await this.friendshipRepository.delete({ from });
    }
};
exports.FriendshipService = FriendshipService;
exports.FriendshipService = FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friendship_entity_1.Friendship)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], FriendshipService);
//# sourceMappingURL=friendship.service.js.map