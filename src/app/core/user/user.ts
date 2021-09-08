export interface User{
  user_id: number;
  user_name: string;
  user_full_name: string;
  user_email: string;
  address: string;
  description: string;
  user_avatar_url: string;
  user_cover_url: string;
  following: boolean;
  user_followers: bigint;
  user_following: bigint;
  user_code_verification: boolean;
  exp;
  time_expire;
  verified: boolean;
}
