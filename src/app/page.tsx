"use client"
import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { AddToChrome } from "@/components/add-to-chrome"
import Link from "next/link"
import { Settings, ListFilter } from "lucide-react"
import { useEffect, useState } from "react"
import { Favorite } from "./settings/page"

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
          <Link 
            href="/bangs" 
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Bang Commands"
          >
            <ListFilter size={18} />
          </Link>
          <Link 
            href="/settings" 
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Settings"
          >
            <Settings size={18} />
          </Link>
          <ThemeToggle />
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

