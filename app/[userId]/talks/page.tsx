import { createClient } from "@/lib/supabase/server";
import { UserTalksView } from "@/components/user-talks-view";
import { notFound } from "next/navigation";
import type { Talk } from "@/lib/types";
import { cookies } from "next/headers";

interface UserTalksPageProps {
  params: {
    userId: string;
  };
}

export default async function UserTalksPage({ params }: UserTalksPageProps) {
  const supabase = createClient(cookies());

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", params.userId)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  // Get user's saved talks
  const { data: savedTalks, error: talksError } = await supabase
    .from("saved_talks")
    .select("*")
    .eq("user_id", params.userId);

  if (talksError) {
    console.error("Error fetching saved talks:", talksError);
    return <div>Error loading talks</div>;
  }

  const talks: Talk[] = savedTalks?.map((st) => st.talk_data as Talk) || [];

  return (
    <UserTalksView profile={profile} talks={talks} userId={params.userId} />
  );
}

export async function generateMetadata({ params }: UserTalksPageProps) {
  const supabase = createClient(cookies());

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", params.userId)
    .single();

  const userName = profile?.full_name || "Usuario";

  return {
    title: `Charlas de ${userName} - Nerdearla 2025`,
    description: `Descubre las charlas seleccionadas por ${userName} para Nerdearla 2025`,
  };
}
