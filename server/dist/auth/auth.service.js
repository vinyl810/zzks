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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AuthService = class AuthService {
    constructor(jwtService, httpService) {
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async validate({ username, ktoken }) {
        console.log("validating... ktoken: ", ktoken);
        const url = "https://kapi.kakao.com/v2/user/me";
        const config = {
            headers: {
                Authorization: `Bearer ${ktoken}`,
            },
            params: {
                secure_resource: true,
                property_keys: ["kakao_account.profile"],
            },
        };
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, config).pipe((0, rxjs_1.catchError)((error) => {
            console.log(error.response.data);
            throw "An error happened!";
        })));
        const id = data.id;
        const userprofile = data.kakao_account.profile;
        const user = {
            id,
            nickname: userprofile.nickname,
            profile_image_url: userprofile.profile_image_url,
            is_default_image: userprofile.is_default_image,
        };
        if (user.nickname != username)
            return null;
        else
            return this.jwtService.sign(user);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map