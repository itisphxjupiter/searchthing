"use client"

import { bangs } from "@/lib/bang"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { ArrowLeft, Search, Plus, Github, Mail, X, Heart } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function BangsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = Array.from(new Set(bangs.map(bang => bang.c)))

  const filteredBangs = bangs.filter(bang => {
    const matchesSearch = search.trim() === "" ||
      bang.s.toLowerCase().includes(search.toLowerCase()) ||
      bang.t.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || bang.c === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex relative flex-col min-h-screen bg-background">
      <header className="flex-none p-4 w-full">
        <div className="flex justify-between items-center mx-auto w-full max-w-5xl">
          <Link
            href="/"
            className="flex gap-2 items-center p-2 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <div className="flex gap-3 items-center">
            <a
              href="https://github.com/eliasnau/searchthing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 items-center transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github size={18} />
              <span className="text-xs">GitHub</span>
            </a>
            <a
              href="https://ko-fi.com/eliasnau"
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-1 items-center px-2 py-1 text-pink-600 bg-pink-50 rounded-md transition-colors dark:bg-pink-950/30 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
            >
              <Heart size={14} className="text-pink-500" />
              <span className="text-xs">Donate</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container relative flex-1 px-4 py-12 mx-auto max-w-5xl">
        <div className="mb-12 space-y-6 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 sm:text-6xl">
            Bang Commands
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Use <code className="bg-muted px-1 py-0.5 rounded text-xs">!</code> followed by a command to search directly on your favorite sites.
          </p>
          <div className="flex flex-col gap-4 justify-center items-center text-sm sm:flex-row">
            <div className="p-3 rounded-lg bg-muted/50">
              <code className="font-bold">macbook !a</code>
              <span className="ml-2 text-muted-foreground"> → Search Amazon for "macbook"</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <code className="font-bold">!yt coding</code>
              <span className="ml-2 text-muted-foreground"> → Search YouTube for "coding"</span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Search bangs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${!selectedCategory
                  ? 'text-white bg-purple-500'
                  : 'bg-muted hover:bg-muted/80'
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedCategory === category
                    ? 'bg-purple-500 text-white'
                    : 'bg-muted hover:bg-muted/80'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBangs.map((bang) => (
              <div
                key={bang.t}
                className="overflow-hidden relative p-6 rounded-lg border transition-colors group bg-card hover:bg-accent/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity from-purple-500/10 to-pink-500/10 group-hover:opacity-100" />
                <div className="relative space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{bang.s}</h2>
                    <code className="px-2 py-1 text-xs rounded bg-muted">
                      !{bang.t}
                    </code>
                  </div>
                  <p className="text-sm font-medium">{bang.c}</p>
                  <p className="text-sm break-all text-muted-foreground">
                    {bang.u.replace('{{{s}}}', 'query')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="flex fixed right-6 bottom-6 z-10 gap-2 justify-center items-center p-0 w-14 h-14 rounded-full border-0 shadow-lg transition-all duration-200 bg-foreground text-background hover:bg-foreground/90 hover:shadow-xl"
              aria-label="Add Bang"
            >
              <Plus size={24} />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Contribute a Bang
              </DialogTitle>
              <DialogDescription className="text-base">
                Help improve SearchThing by adding your favorite site
              </DialogDescription>
            </DialogHeader>

            <div className="py-4 space-y-6">
              <div className="p-4 space-y-3 rounded-lg border transition-colors hover:bg-accent/50">
                <h3 className="flex gap-2 items-center font-semibold">
                  <Github size={18} />
                  Create a Pull Request
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add your bang to the repository by submitting a PR on GitHub.
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r transition-all duration-200 from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20"
                  onClick={() => window.open("https://github.com/eliasnau/searchthing", "_blank")}
                >
                  Open GitHub Repository
                </Button>
              </div>

              <div className="p-4 space-y-3 rounded-lg border transition-colors hover:bg-accent/50">
                <h3 className="flex gap-2 items-center font-semibold">
                  <Mail size={18} />
                  Send an Email
                </h3>
                <p className="text-sm text-muted-foreground">
                  Email us with the site name, URL pattern, and preferred bang command.
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-gradient-to-r transition-all duration-200 from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20"
                  onClick={() => window.location.href = "mailto:contact@eliasnau.dev?subject=New%20Bang%20Suggestion"}
                >
                  Send Email
                </Button>
              </div>

              <div className="p-4 space-y-3 rounded-lg border">
                <h3 className="font-semibold">Bang Format</h3>
                <pre className="overflow-auto p-3 font-mono text-xs rounded-md bg-muted">
                  {`{
  c: "Category",     // Main category
  d: "domain.com",   // Base domain
  s: "Site Name",    // Display name
  sc: "Subcategory", // Sub-category
  t: "bang",         // Bang command
  u: "https://..."   // Search URL pattern
}`}
                </pre>
              </div>
            </div>
            <DialogClose asChild>
              <Button
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  )
}