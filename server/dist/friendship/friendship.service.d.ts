import { Repository } from "typeorm";
import { Friendship } from "./friendship.entity";
import { FriendshipDto } from "./dto/friendship.dto";
import { User } from "src/users/user.entity";
import { UsersService } from "src/users/users.service";
export declare class FriendshipService {
    private friendshipRepository;
    private usersService;
    constructor(friendshipRepository: Repository<Friendship>, usersService: UsersService);
    findAllRelated(user: User): Promise<Friendship[]>;
    findOneByFromTo(from: User, to: User): Promise<Friendship | null>;
    findFriends(user: User): Promise<User[]>;
    findAllByTo(to: User): Promise<Friendship[]>;
    create(friendshipDto: FriendshipDto): Promise<Friendship>;
    remove(id: string): Promise<void>;
    removeByFrom(from: User): Promise<void>;
}
