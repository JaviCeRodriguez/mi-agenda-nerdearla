"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import type { Talk, SavedTalk } from "@/lib/types";

export async function saveTalk(talkId: string) {
  const supabase = createClient(cookies());

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Debes iniciar sesión para guardar charlas");
  }

  // Check if talk is already saved
  const { data: existingSavedTalk } = await supabase
    .from("saved_talks")
    .select("id")
    .eq("user_id", user.id)
    .eq("talk_id", talkId)
    .single();

  if (existingSavedTalk) {
    throw new Error("Esta charla ya está guardada");
  }

  // Save talk with just the talk_id reference
  const { error: saveError } = await supabase.from("saved_talks").insert({
    user_id: user.id,
    talk_id: talkId,
  });

  if (saveError) {
    throw new Error("Error al guardar la charla");
  }

  revalidatePath("/");
  return { success: true };
}

export async function unsaveTalk(talkId: string) {
  const supabase = createClient(cookies());

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Debes iniciar sesión para remover charlas");
  }

  // Remove saved talk
  const { error: deleteError } = await supabase
    .from("saved_talks")
    .delete()
    .eq("user_id", user.id)
    .eq("talk_id", talkId);

  if (deleteError) {
    throw new Error("Error al remover la charla");
  }

  revalidatePath("/");
  return { success: true };
}

export async function getSavedTalks(): Promise<Talk[]> {
  const supabase = createClient(cookies());

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return [];
  }

  // Get saved talk IDs
  const { data: savedTalks, error: savedError } = await supabase
    .from("saved_talks")
    .select("talk_id")
    .eq("user_id", user.id);

  if (savedError) {
    console.error("Error fetching saved talks:", savedError);
    return [];
  }

  if (!savedTalks || savedTalks.length === 0) {
    return [];
  }

  // Get talk details for saved talks
  const { data: talks, error: talksError } = await supabase
    .from("talks")
    .select("*")
    .in(
      "id",
      savedTalks.map((st) => st.talk_id)
    );

  if (talksError) {
    console.error("Error fetching talks:", talksError);
    return [];
  }

  return talks || [];
}

export async function isTalkSaved(talkId: string): Promise<boolean> {
  const supabase = createClient(cookies());

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return false;
  }

  // Check if talk is saved
  const { data: savedTalk } = await supabase
    .from("saved_talks")
    .select("id")
    .eq("user_id", user.id)
    .eq("talk_id", talkId)
    .single();

  return !!savedTalk;
}

export async function getUserTalks(userId: string): Promise<{
  profile: any;
  talks: Talk[];
}> {
  const supabase = createClient(cookies());

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    throw new Error("Usuario no encontrado");
  }

  // Get user's saved talk IDs
  const { data: savedTalks, error: savedError } = await supabase
    .from("saved_talks")
    .select("talk_id")
    .eq("user_id", userId);

  if (savedError) {
    console.error("Error fetching saved talks:", savedError);
    return { profile, talks: [] };
  }

  if (!savedTalks || savedTalks.length === 0) {
    return { profile, talks: [] };
  }

  // Get talk details for saved talks
  const { data: talks, error: talksError } = await supabase
    .from("talks")
    .select("*")
    .in(
      "id",
      savedTalks.map((st) => st.talk_id)
    );

  if (talksError) {
    console.error("Error fetching talks:", talksError);
    return { profile, talks: [] };
  }

  return { profile, talks: talks || [] };
}
