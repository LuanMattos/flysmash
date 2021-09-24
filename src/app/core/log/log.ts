export interface User{
  user_id: number;
  users_name: string;
  users_first_name: string;
  users_email: string;
  address: string;
  description: string;
  users_avatar_url: string;
  users_cover_url: string;
  following: boolean;
  users_followers: bigint;
  users_following: bigint;
  user_code_verification: boolean;
}
