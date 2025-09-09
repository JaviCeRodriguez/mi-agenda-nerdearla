import { Database } from "./database.types";

export type Talk = Database["public"]["Tables"]["talks"]["Row"];

export type SavedTalk = Database["public"]["Tables"]["saved_talks"]["Row"];

export interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
    name?: string;
    picture?: string;
  };
}
