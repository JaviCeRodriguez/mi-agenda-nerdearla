import { createClient } from "@/lib/supabase/client";
import type { Talk, SavedTalk } from "@/lib/types";

// Extended type for saved talks with speaker information
export interface SavedTalkWithDetails extends Talk {
  saved_at: string;
}

/**
 * Fetch saved talks for the current user with full talk details
 */
export const fetchSavedTalksFromUser = async (): Promise<
  SavedTalkWithDetails[]
> => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user?.user?.id) {
    return [];
  }

  // Get saved talks for the current user with talk details
  const { data: savedTalks, error: savedError } = await supabase
    .from("saved_talks")
    .select("talk_id, created_at")
    .eq("user_id", user.user.id);

  if (savedError || !savedTalks?.length) {
    return [];
  }

  // Get the actual talk details for each saved talk
  const talkIds = savedTalks.map((st) => st.talk_id);
  const { data: talks, error: talksError } = await supabase
    .from("talks")
    .select("*")
    .in("id", talkIds);

  if (talksError || !talks?.length) {
    return [];
  }

  // Combine saved talks with talk details
  return talks.map((talk) => {
    const savedTalk = savedTalks.find((st) => st.talk_id === talk.id);
    return {
      ...talk,
      saved_at:
        savedTalk?.created_at || talk.created_at || new Date().toISOString(),
    };
  });
};

/**
 * Save a talk for the current user
 */
export const saveTalkForUser = async (talkId: string): Promise<boolean> => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user?.user?.id) {
    return false;
  }

  try {
    const { error } = await supabase.from("saved_talks").insert({
      user_id: user.user.id,
      talk_id: talkId,
    });

    if (error) {
      console.error("Error saving talk:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error saving talk:", error);
    return false;
  }
};

/**
 * Remove a saved talk for the current user
 */
export const removeSavedTalk = async (talkId: string): Promise<boolean> => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user?.user?.id) {
    return false;
  }

  try {
    const { error } = await supabase
      .from("saved_talks")
      .delete()
      .eq("user_id", user.user.id)
      .eq("talk_id", talkId);

    if (error) {
      console.error("Error removing talk:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error removing talk:", error);
    return false;
  }
};

/**
 * Check if a talk is saved by the current user
 */
export const isTalkSaved = async (talkId: string): Promise<boolean> => {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user?.user?.id) {
    return false;
  }

  try {
    const { data, error } = await supabase
      .from("saved_talks")
      .select("id")
      .eq("user_id", user.user.id)
      .eq("talk_id", talkId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "not found" error
      console.error("Error checking if talk is saved:", error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error("Error checking if talk is saved:", error);
    return false;
  }
};
