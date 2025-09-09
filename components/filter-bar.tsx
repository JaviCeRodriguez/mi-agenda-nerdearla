"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter } from "lucide-react";
import { parseFilterParams, updateUrlWithFilters } from "@/lib/url-params";
import {
  CONFERENCE_DAYS,
  CONFERENCE_TRACKS,
  DEFAULT_DAY,
  getTrackBadgeClasses,
} from "@/lib/utils";

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { day, tracks: urlTracks } = parseFilterParams(searchParams);

  const selectedDay = day || DEFAULT_DAY;
  const selectedTracks = urlTracks || [];

  const updateUrl = (
    newParams: Partial<{ day?: string; tracks?: string[] }>
  ) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    const newUrl = updateUrlWithFilters(currentParams, newParams);
    router.push(`?${newUrl}`);
  };

  const handleDayChange = (dayId: string) => {
    updateUrl({ day: dayId });
  };

  const toggleTrack = (track: string) => {
    const newTracks = selectedTracks.includes(track)
      ? selectedTracks.filter((t) => t !== track)
      : [...selectedTracks, track];
    updateUrl({ tracks: newTracks });
  };

  const clearFilters = () => {
    updateUrl({ tracks: [] });
  };

  return (
    <div className="space-y-4">
      {/* Day Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Calendar className="w-4 h-4" />
          Día
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CONFERENCE_DAYS.map((day) => (
            <Button
              key={day.id}
              variant={selectedDay === day.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleDayChange(day.id)}
              className={`whitespace-nowrap py-5 ${
                selectedDay === day.id
                  ? "bg-[#EF3B42] hover:bg-[#EF3B42]/90 text-white border-[#EF3B42]"
                  : "border-[#02A7A3] text-[#02A7A3] hover:bg-[#02A7A3] hover:text-white"
              }`}
            >
              <div className="text-center">
                <div className="font-medium">{day.label}</div>
                <div className="text-xs opacity-75">{day.date}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Track Filter */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Filter className="w-4 h-4" />
          Tracks
        </div>
        <div className="flex flex-wrap gap-2">
          {CONFERENCE_TRACKS.map((track) => {
            const isSelected = selectedTracks.includes(track);
            return (
              <Badge
                key={track}
                variant={isSelected ? "default" : "outline"}
                className={`cursor-pointer transition-all duration-200 ${getTrackBadgeClasses(
                  track,
                  isSelected
                )}`}
                onClick={() => toggleTrack(track)}
              >
                {track}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Active Filters */}
      {selectedTracks.length > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Filtros activos:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2 text-xs"
          >
            Limpiar todo
          </Button>
        </div>
      )}
    </div>
  );
}
