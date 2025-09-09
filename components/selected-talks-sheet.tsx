"use client";

import { Clock, MapPin, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useSavedTalks } from "@/contexts/saved-talks-context";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRefresh?: () => void;
};

export function SelectedTalksSheet({ isOpen, onClose, onRefresh }: Props) {
  const { savedTalks, isLoading, unsaveTalk } = useSavedTalks();

  const removeTalk = async (talkId: string) => {
    try {
      await unsaveTalk(talkId);
      onRefresh?.();
    } catch (error) {
      console.error("Error removing talk:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg">
              Mis Charlas Seleccionadas
            </SheetTitle>
          </div>
          <SheetDescription className="text-sm">
            {isLoading
              ? "Cargando..."
              : savedTalks.length === 0
              ? "No has seleccionado ninguna charla aún"
              : `${savedTalks.length} charla${
                  savedTalks.length > 1 ? "s" : ""
                } seleccionada${savedTalks.length > 1 ? "s" : ""}`}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)] p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-muted-foreground animate-pulse" />
              </div>
              <p className="text-muted-foreground text-sm">
                Cargando tus charlas...
              </p>
            </div>
          ) : savedTalks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                Selecciona charlas desde la agenda para verlas aquí
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {savedTalks.map((talk) => (
                <div
                  key={talk.id}
                  className="border border-border rounded-lg p-5 space-y-4 bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {talk.time_slot}
                        <MapPin className="w-3 h-3 ml-1" />
                        {talk.room}
                      </div>
                      <h4 className="font-medium text-sm leading-tight text-pretty">
                        {talk.title}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge
                          variant="secondary"
                          className="text-xs px-2 py-1"
                        >
                          {talk.track}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-2 py-1">
                          {talk.day}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTalk(talk.id)}
                      className="shrink-0 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-border/50">
                    <Avatar className="w-7 h-7 shrink-0">
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt={talk.speakers[0] || "Speaker"}
                      />
                      <AvatarFallback className="text-xs">
                        {talk.speakers[0]
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("") || "S"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">
                        {talk.speakers.join(", ")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {talk.description
                          ? talk.description.length > 50
                            ? `${talk.description.substring(0, 50)}...`
                            : talk.description
                          : "Sin descripción"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
