import { UsersService } from "./users.service";
import { Request } from "express";
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    signup(req: Request): Promise<import("./user.entity").User>;
    signout(req: Request): Promise<string>;
}
