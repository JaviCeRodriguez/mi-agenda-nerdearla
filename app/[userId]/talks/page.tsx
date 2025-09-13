import { UserTalksView } from "@/components/user-talks-view";
import { notFound } from "next/navigation";
import { getUserTalks } from "@/lib/actions";

interface UserTalksPageProps {
  params: {
    userId: string;
  };
}

export default async function UserTalksPage({ params }: UserTalksPageProps) {
  try {
    const { profile, talks } = await getUserTalks(params.userId);
    return (
      <UserTalksView profile={profile} talks={talks} userId={params.userId} />
    );
  } catch (error) {
    console.error("Error loading user talks:", error);
    notFound();
  }
}

export async function generateMetadata({ params }: UserTalksPageProps) {
  try {
    const { profile } = await getUserTalks(params.userId);
    const userName = profile?.full_name || "Usuario";

    return {
      title: `Charlas de ${userName} - Nerdearla 2025`,
      description: `Descubre las charlas seleccionadas por ${userName} para Nerdearla 2025`,
    };
  } catch (error) {
    return {
      title: "Charlas de Usuario - Nerdearla 2025",
      description: "Descubre las charlas seleccionadas para Nerdearla 2025",
    };
  }
}
