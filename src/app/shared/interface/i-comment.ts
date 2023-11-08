import { IUser } from "./i-user";

export interface IComment {
    id?: number,
    user: IUser;
    text: string;
    childs?: IComment[];
    createdAt: string;
    showReplyForm: boolean;
  }