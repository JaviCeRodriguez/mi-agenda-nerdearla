"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { createClient } from "@/lib/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Talk } from "@/lib/types";

interface SavedTalksContextType {
  savedTalkIds: Set<string>;
  savedTalks: Talk[];
  isLoading: boolean;
  saveTalk: (talkId: string) => Promise<void>;
  unsaveTalk: (talkId: string) => Promise<void>;
  isTalkSaved: (talkId: string) => boolean;
  refreshSavedTalks: () => Promise<void>;
}

const SavedTalksContext = createContext<SavedTalksContextType | undefined>(
  undefined
);

export function useSavedTalks() {
  const context = useContext(SavedTalksContext);
  if (context === undefined) {
    throw new Error("useSavedTalks must be used within a SavedTalksProvider");
  }
  return context;
}

interface SavedTalksProviderProps {
  children: React.ReactNode;
}

export function SavedTalksProvider({ children }: SavedTalksProviderProps) {
  const [savedTalkIds, setSavedTalkIds] = useState<Set<string>>(new Set());
  const [savedTalks, setSavedTalks] = useState<Talk[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const loadSavedTalks = useCallback(
    async (currentUserId: string) => {
      try {
        // Get saved talk IDs
        const { data: savedTalksData, error: savedError } = await supabase
          .from("saved_talks")
          .select("talk_id")
          .eq("user_id", currentUserId);

        if (savedError) throw savedError;

        const talkIds = new Set(
          savedTalksData?.map((item) => item.talk_id) || []
        );
        setSavedTalkIds(talkIds);

        // Get full talk details for saved talks
        if (talkIds.size > 0) {
          const { data: talksData, error: talksError } = await supabase
            .from("talks")
            .select("*")
            .in("id", Array.from(talkIds));

          if (talksError) throw talksError;
          setSavedTalks(talksData || []);
        } else {
          setSavedTalks([]);
        }
      } catch (error) {
        console.error("Error loading saved talks:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las charlas guardadas",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [supabase, toast]
  );

  useEffect(() => {
    if (isInitialized) return;

    // Get current user and load saved talks
    const initializeUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserId(user?.id || null);

        if (user?.id) {
          await loadSavedTalks(user.id);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing user:", error);
        setIsLoading(false);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const newUserId = session?.user?.id || null;
      setUserId(newUserId);

      if (newUserId) {
        await loadSavedTalks(newUserId);
      } else {
        setSavedTalkIds(new Set());
        setSavedTalks([]);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [isInitialized, loadSavedTalks, supabase.auth]);

  const saveTalk = async (talkId: string) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para guardar charlas",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.from("saved_talks").insert({
        user_id: userId,
        talk_id: talkId,
      });

      if (error) throw error;

      setSavedTalkIds((prev) => new Set([...prev, talkId]));

      // Refresh saved talks to get the new talk details
      if (userId) {
        await refreshSavedTalks();
      }

      toast({
        title: "Charla guardada",
        description: "La charla ha sido agregada a tus favoritos",
      });
    } catch (error) {
      console.error("Error saving talk:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al guardar la charla",
        variant: "destructive",
      });
    }
  };

  const unsaveTalk = async (talkId: string) => {
    if (!userId) {
      toast({
        title: "Error",
        description: "Debes iniciar sesión para guardar charlas",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("saved_talks")
        .delete()
        .eq("user_id", userId)
        .eq("talk_id", talkId);

      if (error) throw error;

      setSavedTalkIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(talkId);
        return newSet;
      });

      // Update saved talks list
      setSavedTalks((prev) => prev.filter((talk) => talk.id !== talkId));

      toast({
        title: "Charla removida",
        description: "La charla ha sido removida de tus favoritos",
      });
    } catch (error) {
      console.error("Error unsaving talk:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al remover la charla",
        variant: "destructive",
      });
    }
  };

  const isTalkSaved = (talkId: string) => {
    return savedTalkIds.has(talkId);
  };

  const refreshSavedTalks = useCallback(async () => {
    if (userId) {
      await loadSavedTalks(userId);
    }
  }, [userId, loadSavedTalks]);

  const value: SavedTalksContextType = {
    savedTalkIds,
    savedTalks,
    isLoading,
    saveTalk,
    unsaveTalk,
    isTalkSaved,
    refreshSavedTalks,
  };

  return (
    <SavedTalksContext.Provider value={value}>
      {children}
    </SavedTalksContext.Provider>
  );
}
