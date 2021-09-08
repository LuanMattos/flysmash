export interface Follower{
  user_name: string;
  user_full_name: string;
  user_email: string;
  description: string;
  user_avatar_url: string;
  user_cover_url: string;
  following: boolean;
  user_followers: bigint;
  user_following: bigint;
}
