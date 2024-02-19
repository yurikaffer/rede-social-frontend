import { UserInterface } from "./UserInterface";

export interface FollowInterface {
    id: number;
    follower: UserInterface;
    followed_user: UserInterface;
}