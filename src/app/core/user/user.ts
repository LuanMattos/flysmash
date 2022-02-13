export interface User{
  users_id: number;
  users_name: string;
  users_full_name: string;
  users_email: string;
  users_avatar: string;
  users_cover_url: string;
  users_following_numbers: bigint;
  users_following: boolean;
  users_followers: bigint;
  users_code_verification: boolean;
  users_first_name: string;
  users_description: string;
  users_last_name: string;
  exp;
  time_expire;
  is_verified: boolean;
}
