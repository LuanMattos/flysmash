export interface User{
  users_id: number;
  users_name: string;
  users_full_name: string;
  users_email: string;
  users_avatar_url: string;
  users_cover_url: string;
  users_following_numbers: bigint;
  users_following: boolean;
  users_followers: bigint;
  users_code_verification: boolean;
  exp;
  time_expire;
  verified: boolean;
}
