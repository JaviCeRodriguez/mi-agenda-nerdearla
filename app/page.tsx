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
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#02A7A3] via-teal-600 to-cyan-700 p-8 md:p-12 text-white">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-transparent"></div>
          </div>

          <div className="relative z-10">
            {/* Year and Progress Indicators */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl md:text-5xl font-black text-white/90">
                2025
              </span>
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  ></div>
                ))}
              </div>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-black mb-4 text-yellow-300 drop-shadow-lg">
              NERDEARLA
            </h1>

            {/* Tech Categories */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm md:text-base">
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                DESARROLLO
              </span>
              <span className="text-white/60">•</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                CIENCIA DE DATOS
              </span>
              <span className="text-white/60">•</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                INFRAESTRUCTURA
              </span>
              <span className="text-white/60">•</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                SEGURIDAD
              </span>
              <span className="text-white/60">•</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                AI
              </span>
              <span className="text-white/60">•</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                TESTING
              </span>
              <span className="text-white/60">•</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                UX
              </span>
              <span className="text-white/60">•</span>
              <span className="bg-white/20 px-3 py-1 rounded-full font-medium">
                SOFTSKILLS
              </span>
            </div>

            {/* Tagline */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20">
              <p className="text-lg md:text-xl font-semibold text-center">
                11 AÑOS DE TECNOLOGÍA + OPEN SOURCE
              </p>
            </div>

            {/* Date and Location */}
            <div className="flex items-center justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span className="font-bold">🇦🇷</span>
                <span>09</span>
                <span>23-27</span>
                <span className="font-bold">BUE</span>
              </div>
              <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm">
                100% GRATIS
              </div>
            </div>

            {/* Description */}
            <p className="text-center text-white/90 text-lg md:text-xl mt-6 max-w-3xl mx-auto">
              Descubre todas las charlas de la conferencia tech más grande de
              Latinoamérica
            </p>
          </div>
        </div>
        <Suspense
          fallback={<div className="text-center py-8">Cargando filtros...</div>}
        >
          <FilterBar />
        </Suspense>
        <Suspense
          fallback={<div className="text-center py-8">Cargando charlas...</div>}
        >
          <TalksList searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
