"use client";

import { Header } from "@/components/header";
import { TalkCard } from "@/components/talk-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Share2, Calendar, MapPin } from "lucide-react";
import { useState } from "react";
import type { Talk, Profile } from "@/lib/types";

interface UserTalksViewProps {
  profile: Profile;
  talks: Talk[];
  userId: string;
}

export function UserTalksView({ profile, talks, userId }: UserTalksViewProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Group talks by day
  const talksByDay = talks.reduce((acc, talk) => {
    if (!acc[talk.day]) {
      acc[talk.day] = [];
    }
    acc[talk.day].push(talk);
    return acc;
  }, {} as Record<string, Talk[]>);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* User Profile Section */}
        <div className="text-center space-y-4">
          <Avatar className="w-20 h-20 mx-auto">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="bg-nerdearla-red text-white text-lg">
              {getInitials(profile.full_name || "Usuario")}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Charlas de {profile.full_name}
            </h1>
            <p className="text-muted-foreground">
              {talks.length}{" "}
              {talks.length === 1
                ? "charla seleccionada"
                : "charlas seleccionadas"}{" "}
              para Nerdearla 2025
            </p>
          </div>

          <Button
            onClick={handleShare}
            variant="outline"
            className="gap-2 bg-transparent"
          >
            <Share2 className="w-4 h-4" />
            {copiedUrl ? "URL copiada!" : "Compartir lista"}
          </Button>
        </div>

        {/* Talks Section */}
        {talks.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                No hay charlas seleccionadas
              </h3>
              <p className="text-muted-foreground">
                Este usuario aún no ha guardado ninguna charla.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(talksByDay).map(([day, dayTalks]) => (
              <div key={day} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-nerdearla-red rounded-full" />
                  <h2 className="text-2xl font-bold text-foreground capitalize">
                    {day}
                  </h2>
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {dayTalks.length}{" "}
                    {dayTalks.length === 1 ? "charla" : "charlas"}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {dayTalks.map((talk) => (
                    <TalkCard
                      key={talk.id}
                      talk={talk}
                      isSelected={false}
                      onToggle={() => {}} // Read-only view
                      hideToggle
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Info */}
        {talks.length > 0 && (
          <div className="text-center py-8 border-t border-border">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Nerdearla 2025 - Buenos Aires, Argentina</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
