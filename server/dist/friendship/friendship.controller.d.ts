import { FriendshipService } from "./friendship.service";
import { FriendshipRequestDto } from "./dto/friendship.dto";
import { Request } from "express";
import { UsersService } from "src/users/users.service";
export declare class FriendshipController {
    private friendshipService;
    private usersService;
    constructor(friendshipService: FriendshipService, usersService: UsersService);
    add(body: FriendshipRequestDto, req: Request): Promise<import("./friendship.entity").Friendship>;
    userFriends(req: Request): Promise<import("../users/user.entity").User[]>;
}
