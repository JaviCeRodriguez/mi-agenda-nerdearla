import { Suspense } from "react";
import { Header } from "@/components/header";
import { FilterBar } from "@/components/filter-bar";
import { TalksList } from "@/components/talks-list";

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Nerdearla 2025</h1>
          <p className="text-muted-foreground text-balance">
            Descubre todas las charlas de la conferencia tech más grande de
            Latinoamérica
          </p>
        </div>
        <FilterBar />
        <Suspense
          fallback={<div className="text-center py-8">Cargando charlas...</div>}
        >
          <TalksList searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
