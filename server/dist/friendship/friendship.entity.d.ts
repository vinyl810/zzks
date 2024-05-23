import { User } from "src/users/user.entity";
export declare class Friendship {
    id: string;
    from: User;
    to: User;
    is_accepted: boolean;
    is_blocked: boolean;
    blocked_by: User | null;
}
