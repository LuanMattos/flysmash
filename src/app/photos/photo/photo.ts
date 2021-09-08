export interface Photo{
  photo_id: number;
  photo_post_date: Date;
  photo_url: string;
  photo_description: string;
  photo_allow_comments: string;
  photo_likes: number;
  photo_comments: number;
  user_id: number;
  photo_public: number;
  likes: [];
  liked: boolean;
  user_full_name: string;
  user_name: string;
  user_cover_url: string;
  user_avatar_url: string;
  photo_styles: string;
}
