import { Friendship } from "src/friendship/friendship.entity";
export declare class User {
    id: string;
    username: string;
    profile_image_url: string | null;
    fromFriendships: Friendship[];
    toFriendships: Friendship[];
    blocking: Friendship[];
}
