"use client";

import { Header } from "@/components/header";
import { TalkCard } from "@/components/talk-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Copy, Check, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { unsaveTalk } from "@/lib/actions";
import type { Talk, Profile } from "@/lib/types";

interface UserTalksViewProps {
  profile: Profile;
  talks: Talk[];
  userId: string;
}

export function UserTalksView({ profile, talks, userId }: UserTalksViewProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    // Set the share URL on the client side
    setShareUrl(window.location.href);

    // Get current user
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
      setIsLoading(false);
    };

    getCurrentUser();
  }, [supabase.auth]);

  const handleShare = async () => {
    try {
      if (shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      } else {
        console.error("No URL available to copy");
      }
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  const handleInputClick = async () => {
    try {
      if (shareUrl) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy URL from input:", err);
    }
  };

  const handleTwitterShare = () => {
    if (!shareUrl) {
      console.error("No URL available for sharing");
      return;
    }

    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(
      `Mira las charlas que ${profile.full_name} seleccionó para Nerdearla 2025!`
    );

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
    window.open(twitterShareUrl, "_blank", "noopener,noreferrer");
  };

  const handleRemoveTalk = async (talkId: string) => {
    try {
      await unsaveTalk(talkId);
      toast({
        title: "Charla removida",
        description: "La charla ha sido removida de tus favoritos",
      });
      // Refresh the page to update the talks list
      window.location.reload();
    } catch (error) {
      console.error("Error removing talk:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al remover la charla",
        variant: "destructive",
      });
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

  // Check if current user is viewing their own profile
  const isOwnProfile = currentUser?.id === userId;

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
        <div className="text-center space-y-6">
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="bg-nerdearla-red text-white text-xl">
              {getInitials(profile.full_name || "Usuario")}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-foreground">
              {isOwnProfile ? "Mis Charlas" : `Charlas de ${profile.full_name}`}
            </h1>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="secondary" className="text-sm px-3 py-1">
                {talks.length}{" "}
                {talks.length === 1
                  ? "charla seleccionada"
                  : "charlas seleccionadas"}
              </Badge>
              <Badge variant="outline" className="text-sm px-3 py-1">
                Nerdearla 2025
              </Badge>
              {isOwnProfile && (
                <Badge
                  variant="default"
                  className="text-sm px-3 py-1 bg-green-600"
                >
                  Editable
                </Badge>
              )}
            </div>
          </div>

          {/* Share Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={handleShare}
                variant="default"
                className="gap-2"
                size="lg"
              >
                {copiedUrl ? (
                  <>
                    <Check className="w-4 h-4" />
                    ¡URL copiada!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copiar enlace
                  </>
                )}
              </Button>

              <Button
                onClick={handleTwitterShare}
                variant="outline"
                className="gap-2"
                size="lg"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Compartir en X
              </Button>
            </div>

            {/* URL Input for easy copying */}
            <div className="max-w-md mx-auto">
              <Input
                value={shareUrl}
                readOnly
                className="text-center text-sm cursor-pointer"
                onClick={handleInputClick}
                placeholder="Cargando URL..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                {shareUrl ? "Haz clic para copiar el enlace" : "Cargando..."}
              </p>
            </div>
          </div>
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
                    <div key={talk.id} className="relative">
                      <TalkCard
                        talk={talk}
                        isSelected={false}
                        onToggle={() => {}} // Read-only view
                        hideToggle
                      />
                      {isOwnProfile && (
                        <Button
                          onClick={() => handleRemoveTalk(talk.id)}
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-destructive/90"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
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
