import { Post } from "./post";

export interface Posts<Array>{
  posts_id: number;
  posts_allow_comments: string;
  posts_description: string;
  users_id: number;
}
