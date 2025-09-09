import { TalkCard } from "@/components/talk-card";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { parseFilterParams } from "@/lib/url-params";
import { filterTalks, convertSearchParamsToURLSearchParams } from "@/lib/utils";
import type { Talk } from "@/lib/types";

const fetchTalks = async () => {
  const supabase = createClient(cookies());
  const { data: talks, error } = await supabase.from("talks").select("*");
  if (error) {
    return { status: "error", talks: [] };
  }
  return { status: "success", talks };
};

interface TalksListProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function TalksList({ searchParams }: TalksListProps) {
  const { talks } = await fetchTalks();

  const urlSearchParams = convertSearchParamsToURLSearchParams(searchParams);
  const { day, tracks } = parseFilterParams(urlSearchParams as any);
  const filteredTalks = filterTalks(talks, day, tracks);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Charlas</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {filteredTalks.length} de {talks.length} charlas
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredTalks.map((talk) => (
          <TalkCard key={talk.id} talk={talk} />
        ))}
      </div>

      {filteredTalks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            No se encontraron charlas con los filtros seleccionados.
          </p>
        </div>
      )}
    </div>
  );
}
