import { UserInterface } from "./UserInterface";
import { CommentInterface } from "./CommentInterface";
import { LikeInterface } from "./LikeInterface";

export interface PostInterface {
    id: number;
    content: string;
    createdAt: Date;
    user: UserInterface;
    imgURL: string;
    likes: LikeInterface[];
    comments: CommentInterface[];
  }