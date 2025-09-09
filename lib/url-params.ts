import { ReadonlyURLSearchParams } from "next/navigation";

export interface FilterParams {
  day?: string;
  tracks?: string[];
}

export function parseFilterParams(
  searchParams: ReadonlyURLSearchParams
): FilterParams {
  const day = searchParams.get("day") || undefined;
  const tracksParam = searchParams.get("tracks");
  const tracks = tracksParam ? tracksParam.split(",") : undefined;

  return {
    day,
    tracks,
  };
}

export function createFilterUrl(params: FilterParams): string {
  const searchParams = new URLSearchParams();

  if (params.day) {
    searchParams.set("day", params.day);
  }

  if (params.tracks && params.tracks.length > 0) {
    searchParams.set("tracks", params.tracks.join(","));
  }

  return searchParams.toString();
}

export function updateUrlWithFilters(
  currentParams: URLSearchParams,
  newParams: Partial<FilterParams>
): string {
  const searchParams = new URLSearchParams(currentParams);

  if (newParams.day !== undefined) {
    if (newParams.day) {
      searchParams.set("day", newParams.day);
    } else {
      searchParams.delete("day");
    }
  }

  if (newParams.tracks !== undefined) {
    if (newParams.tracks && newParams.tracks.length > 0) {
      searchParams.set("tracks", newParams.tracks.join(","));
    } else {
      searchParams.delete("tracks");
    }
  }

  return searchParams.toString();
}
