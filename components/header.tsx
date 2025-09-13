"use client";

import {
  Calendar,
  Users,
  MapPin,
  Menu,
  UserIcon,
  LogOut,
  LogIn,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthButton } from "@/components/auth-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@/lib/types";
import { useRouter } from "next/navigation";

interface HeaderProps {
  selectedCount?: number;
  onOpenSheet?: () => void;
  hideSelectedButton?: boolean;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setMobileMenuOpen(false);
  };

  const signInWithGitHub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    setMobileMenuOpen(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ruGG9ypuHIOfvUTQ3XUActxeatVvsh.png"
                alt="Nerdearla"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-gray-900 dark:text-white">
                Nerdearla
              </span>
              <span className="text-xs text-[#02A7A3] font-medium">
                Agenda 2025
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <nav className="hidden md:flex items-center space-x-1">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#EF3B42] hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Agenda
                </Button>
              </Link>
              <Link
                href="https://nerdear.la/speakers/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#02A7A3] hover:bg-teal-50 dark:hover:bg-teal-950/20"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Speakers
                </Button>
              </Link>
              <Link
                href="https://nerdear.la/location/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-[#f7ab14] hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Ubicación
                </Button>
              </Link>
            </nav>

            <div className="hidden md:block">
              <AuthButton />
            </div>

            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-gray-600 dark:text-gray-300"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[320px] sm:w-[380px] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center space-x-4 p-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ruGG9ypuHIOfvUTQ3XUActxeatVvsh.png"
                      alt="Nerdearla"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        Nerdearla
                      </h3>
                      <p className="text-sm font-medium text-[#02A7A3]">
                        Agenda 2025
                      </p>
                    </div>
                  </div>

                  <nav className="flex flex-col px-6 py-4 space-y-1">
                    <Button
                      variant="ghost"
                      className="justify-start text-gray-700 dark:text-gray-200 hover:text-[#EF3B42] hover:bg-red-50 dark:hover:bg-red-950/20 h-12 px-4 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Calendar className="w-5 h-5 mr-4" />
                      Agenda
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-gray-700 dark:text-gray-200 hover:text-[#02A7A3] hover:bg-teal-50 dark:hover:bg-teal-950/20 h-12 px-4 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users className="w-5 h-5 mr-4" />
                      Speakers
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-gray-700 dark:text-gray-200 hover:text-[#f7ab14] hover:bg-yellow-50 dark:hover:bg-yellow-950/20 h-12 px-4 text-base font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MapPin className="w-5 h-5 mr-4" />
                      Ubicación
                    </Button>
                  </nav>

                  <div className="flex-1 px-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    {loading ? (
                      <div className="flex items-center justify-center py-8">
                        <div className="text-base text-gray-500 font-medium">
                          Cargando...
                        </div>
                      </div>
                    ) : !user ? (
                      <div className="space-y-3">
                        <Button
                          onClick={signInWithGoogle}
                          className="w-full justify-start text-white hover:text-[#EF3B42] hover:bg-red-50 dark:hover:bg-red-950/20 h-12 px-4 text-base font-medium"
                        >
                          <svg className="h-5 w-5 mr-4" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Continuar con Google
                        </Button>
                        <Button
                          onClick={signInWithGitHub}
                          className="w-full justify-start text-white hover:text-[#02A7A3] hover:bg-teal-50 dark:hover:bg-teal-950/20 h-12 px-4 text-base font-medium"
                        >
                          <Github className="h-5 w-5 mr-4" />
                          Continuar con GitHub
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-[#02A7A3] rounded-xl shadow-sm">
                          <Avatar className="h-12 w-12 ring-2 ring-white/20">
                            <AvatarImage
                              src={
                                user.user_metadata?.avatar_url ||
                                user.user_metadata?.picture ||
                                "/placeholder.svg"
                              }
                              alt={
                                user.user_metadata?.full_name ||
                                user.user_metadata?.name ||
                                "Usuario"
                              }
                            />
                            <AvatarFallback className="bg-white/20 text-white">
                              <UserIcon className="h-6 w-6" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold text-white truncate">
                              {user.user_metadata?.full_name ||
                                user.user_metadata?.name ||
                                user.email?.split("@")[0] ||
                                "Usuario"}
                            </p>
                            <p className="text-sm text-white/90 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Link href={`/${user.id}/talks`} key="user-talks">
                            <Button className="w-full justify-start text-white hover:text-[#02A7A3] hover:bg-teal-50 dark:hover:bg-teal-950/20 h-12 px-4 text-base font-medium rounded-lg">
                              <UserIcon className="h-5 w-5 mr-4" />
                              Mis Charlass
                            </Button>
                          </Link>
                          <Button
                            onClick={signOut}
                            className="w-full justify-start text-white hover:text-[#EF3B42] hover:bg-red-50 dark:hover:bg-red-950/20 h-12 px-4 text-base font-medium rounded-lg"
                          >
                            <LogOut className="h-5 w-5 mr-4" />
                            Cerrar Sesión
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
