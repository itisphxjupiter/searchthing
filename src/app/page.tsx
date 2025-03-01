"use client"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { AddToChrome } from "@/components/add-to-chrome"
import Link from "next/link"
import { Settings, CircleAlert } from "lucide-react"
import { useEffect, useState } from "react"
import { Favorite } from "./settings/page"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Home() {
  const [favorites, setFavorites] = useState<Favorite[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
  }, [])

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
        <div className="text-center space-y-8 w-full max-w-2xl mx-auto">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text truncate">
              SearchThing
            </h1>
            <p className="text-muted-foreground">Find what you're looking for</p>
          </div>

          <SearchBar />

          <div className="flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            {favorites.length > 0 ? (
              favorites.map((fav, index) => (
                <div key={index} className="flex items-center gap-3">
                  {index > 0 && <span>•</span>}
                  <a 
                    href={fav.url}
                    className="hover:text-foreground transition-colors"
                  >
                    {fav.name}
                  </a>
                </div>
              ))
            ) : (
              <>
                <span>Add favorites in</span>
                <span>•</span>
                <Link href="/settings" className="hover:text-foreground transition-colors">
                  settings
                </Link>
              </>
            )}
          </div>

          <AddToChrome />
        </div>
      </main>

      <Footer />
    </div>
  )
}

