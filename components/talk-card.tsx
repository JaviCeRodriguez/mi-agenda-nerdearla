"use client";

import {
  Clock,
  MapPin,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TRACK_COLORS } from "@/lib/utils";
import type { Talk } from "@/lib/types";
import { useSavedTalks } from "@/contexts/saved-talks-context";
import { useState } from "react";

interface TalkCardProps {
  talk: Talk;
  isSelected?: boolean;
  onToggle?: () => void;
  hideToggle?: boolean;
}

export function TalkCard({
  talk,
  isSelected = false,
  onToggle,
  hideToggle = false,
}: TalkCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { isTalkSaved, saveTalk, unsaveTalk } = useSavedTalks();

  const isSaved = isTalkSaved(talk.id);

  const handleSaveTalk = async () => {
    setIsLoading(true);

    try {
      if (isSaved) {
        await unsaveTalk(talk.id);
      } else {
        await saveTalk(talk.id);
      }

      // Call the parent onToggle if provided
      if (onToggle) {
        onToggle();
      }
    } catch (error) {
      console.error("Error saving talk:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {talk.time_slot}
              <MapPin className="w-4 h-4 ml-2" />
              {talk.room}
            </div>
            <h3 className="font-semibold text-card-foreground leading-tight text-pretty">
              {talk.title}
            </h3>
            <div className="flex flex-wrap gap-1">
              <Badge
                variant="secondary"
                className={`text-xs ${
                  TRACK_COLORS[talk.track]?.bg || "bg-gray-500"
                } ${TRACK_COLORS[talk.track]?.text || "text-white"}`}
              >
                {talk.track}
              </Badge>
              {talk.url_site && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  asChild
                >
                  <a
                    href={talk.url_site}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Ver en sitio
                  </a>
                </Button>
              )}
            </div>
          </div>
          {!hideToggle && (
            <Button
              variant={isSaved ? "default" : "ghost"}
              size="sm"
              className="shrink-0"
              onClick={handleSaveTalk}
              disabled={isLoading}
            >
              {isSaved ? (
                <BookmarkCheck className="w-4 h-4" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">
            {talk.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-card-foreground">
                {talk.speakers.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
