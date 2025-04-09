"use client";
import { SearchBar } from "@/components/search-bar";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import { AddToChrome } from "@/components/add-to-chrome";
import Link from "next/link";
import { Settings, CircleAlert, Heart, Github, Chrome } from "lucide-react";
import { useEffect, useState } from "react";
import { Favorite } from "./settings/page";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SocialLinks } from "@/components/social-links";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    setFavoritesLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 w-full">
        <div className="flex gap-2 justify-end items-center mx-auto w-full max-w-5xl">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="p-2 rounded-full transition-colors text-muted-foreground hover:text-foreground hover:bg-background/30"
                  aria-label="Settings"
                >
                  <Settings size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ThemeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      <main className="flex flex-col flex-1 justify-center items-center px-4 mx-auto w-full max-w-5xl sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-2xl text-center">
          <div className="mb-12">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 animate-gradient">
              SearchThing
            </h1>
          </div>

          <SearchBar />

          {!favoritesLoaded ? (
            <div className="mt-6 h-6"></div>
          ) : favorites.length > 0 ? (
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {favorites.map((favorite) => (
                <a
                  key={favorite.url}
                  href={favorite.url}
                  className="px-3 py-1 text-xs font-medium rounded-full transition-colors bg-muted hover:bg-muted/80 text-muted-foreground"
                >
                  {favorite.name}
                </a>
              ))}
            </div>
          ) : (
            <div className="mt-6 text-sm text-muted-foreground">
              <Link
                href="/settings"
                className="text-purple-500 transition-colors hover:text-purple-600"
              >
                Add favorites in settings
              </Link>
            </div>
          )}
        </div>
      </main>

      <div className="px-4 mx-auto mb-8 w-full max-w-5xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 justify-between items-center sm:flex-row">
          <div className="text-sm text-center text-muted-foreground sm:text-left">
            <p className="mb-1">
              Use{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">!</code>{" "}
              for quick searches:{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">!w</code>{" "}
              Wikipedia,{" "}
              <code className="bg-muted px-1 py-0.5 rounded text-xs">!g</code>{" "}
              Google
            </p>
            <Link
              href="/bangs"
              className="inline-block font-medium text-purple-500 hover:text-purple-600"
            >
              View all bang commands
            </Link>
          </div>

          <div className="hidden sm:block">
            <AddToChrome />
          </div>
        </div>
      </div>

      <footer className="p-4 w-full">
        <div className="flex flex-col-reverse gap-4 justify-between items-center mx-auto w-full max-w-5xl text-xs sm:flex-row text-muted-foreground">
          <div className="flex gap-4 items-center">
            <a
              href="https://github.com/eliasnau/searchthing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 items-center transition-colors hover:text-foreground"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://ko-fi.com/eliasnau"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 items-center px-2 py-1 text-pink-600 bg-pink-50 rounded-md transition-colors dark:bg-pink-950/30 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
            >
              <Heart size={14} className="text-pink-500" />
              <span>Donate</span>
            </a>
          </div>

          <div className="flex gap-4 items-center mb-3 sm:mb-0">
            <Link
              href="/legal/privacy"
              className="transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
