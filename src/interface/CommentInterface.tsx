import { UserInterface } from "./UserInterface";

export interface CommentInterface {
    id: number;
    content: string;
    createdAt: Date;
    user: UserInterface;

}