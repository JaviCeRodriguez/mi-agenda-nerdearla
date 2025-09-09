"use client";

import { Calendar, Users, MapPin, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthButton } from "@/components/auth-button";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  selectedCount?: number;
  onOpenSheet?: () => void;
  hideSelectedButton?: boolean;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ruGG9ypuHIOfvUTQ3XUActxeatVvsh.png"
                      alt="Nerdearla"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">
                        Nerdearla
                      </h3>
                      <p className="text-sm text-[#02A7A3]">Agenda 2025</p>
                    </div>
                  </div>

                  <nav className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      className="justify-start text-gray-600 dark:text-gray-300 hover:text-[#EF3B42] hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Calendar className="w-4 h-4 mr-3" />
                      Agenda
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-gray-600 dark:text-gray-300 hover:text-[#02A7A3] hover:bg-teal-50 dark:hover:bg-teal-950/20"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Users className="w-4 h-4 mr-3" />
                      Speakers
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-gray-600 dark:text-gray-300 hover:text-[#f7ab14] hover:bg-yellow-50 dark:hover:bg-yellow-950/20"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <MapPin className="w-4 h-4 mr-3" />
                      Ubicación
                    </Button>
                  </nav>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <AuthButton />
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
