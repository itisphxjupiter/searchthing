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
    <div className="min-h-screen flex flex-col items-center justify-between bg-background">
      <header className="w-full p-4">
        <div className="max-w-5xl mx-auto w-full flex justify-end items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/bangs"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Bang Commands"
                >
                  <CircleAlert size={18} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bang Commands</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
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

      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 w-full max-w-2xl mx-auto">
          {/* Title */}
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text truncate">
              SearchThing
            </h1>
          </div>

          {/* Search bar */}
          <SearchBar />

          {/* Favorites */}
          {!favoritesLoaded ? (
            <div className="h-6"></div> // Empty placeholder with same height
          ) : favorites.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2">
              {favorites.map((favorite) => (
                <a
                  key={favorite.url}
                  href={favorite.url}
                  className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs font-medium text-muted-foreground transition-colors"
                >
                  {favorite.name}
                </a>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              <Link
                href="/settings"
                className="text-purple-500 hover:text-purple-600 transition-colors"
              >
                Add favorites in settings
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Bang commands info and Add to Chrome - positioned between main and footer */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
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
              className="text-purple-500 hover:text-purple-600 font-medium inline-block"
            >
              View all bang commands
            </Link>
          </div>

          <div className="hidden sm:block">
            <AddToChrome />
          </div>
        </div>
      </div>

      <footer className="w-full p-4">
        <div className="max-w-5xl mx-auto w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/eliasnau/searchthing"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <a
              href="https://ko-fi.com/eliasnau"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 rounded-md bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
            >
              <Heart size={14} className="text-pink-500" />
              <span>Donate</span>
            </a>
          </div>

          <div className="flex items-center gap-4 mb-3 sm:mb-0">
            <Link
              href="/legal/privacy"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
