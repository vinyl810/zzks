import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserProfileDto } from "src/auth/dto/auth.dto";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    create(userProfileDto: UserProfileDto): Promise<User>;
    remove(id: string): Promise<void>;
}
