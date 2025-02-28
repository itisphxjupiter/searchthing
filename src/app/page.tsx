import { SearchBar } from "@/components/search-bar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { AddToChrome } from "@/components/add-to-chrome"
import Link from "next/link"
import { Settings } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-background">
      <div className="w-full p-4 flex justify-end gap-2">
        <Link href="/settings" className="p-2 rounded-md hover:bg-accent flex items-center" aria-label="Settings">
          <Settings size={20} />
        </Link>
        <ThemeToggle />
      </div>

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
            <span>Fast</span>
            <span>•</span>
            <span>Secure</span>
            <span>•</span>
            <span>Private</span>
          </div>

          <AddToChrome />
        </div>
      </main>

      <Footer />
    </div>
  )
}

