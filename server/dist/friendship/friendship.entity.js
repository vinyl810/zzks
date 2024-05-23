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
exports.Friendship = void 0;
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let Friendship = class Friendship {
};
exports.Friendship = Friendship;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Friendship.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.fromFriendships),
    __metadata("design:type", user_entity_1.User)
], Friendship.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.toFriendships),
    __metadata("design:type", user_entity_1.User)
], Friendship.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Friendship.prototype, "is_accepted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Friendship.prototype, "is_blocked", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.User, (user) => user.blocking),
    __metadata("design:type", user_entity_1.User)
], Friendship.prototype, "blocked_by", void 0);
exports.Friendship = Friendship = __decorate([
    (0, typeorm_1.Entity)()
], Friendship);
//# sourceMappingURL=friendship.entity.js.map