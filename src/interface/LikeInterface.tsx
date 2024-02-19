import { PostInterface } from "./PostInterface";
import { UserInterface } from "./UserInterface";

export interface LikeInterface {
    id: number;
    user: UserInterface;
    post_id: PostInterface;
    createdAt: Date;
}