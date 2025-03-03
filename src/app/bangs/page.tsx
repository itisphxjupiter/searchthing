"use client"

import { bangs } from "../bang"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { ArrowLeft, Search, Plus, Github, Mail, X } from "lucide-react"
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
    <div className="min-h-screen flex flex-col bg-background relative">
      <header className="w-full p-4 flex-none">
        <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
          <Link 
            href="/" 
            className="p-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-12 relative">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            Bang Commands
          </h1>
          <p className="text-muted-foreground">
            Quick shortcuts to search your favorite sites directly
          </p>
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
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                !selectedCategory 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedCategory === category 
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
                className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:bg-accent/50 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{bang.s}</h2>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      !{bang.t}
                    </code>
                  </div>
                  <p className="font-medium text-sm">{bang.c}</p>
                  <p className="text-sm text-muted-foreground break-all">
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
              className="fixed bottom-6 right-6 z-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 rounded-lg h-14 px-5"
            >
              <Plus size={20} />
              <span className="font-medium">Add Bang</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md border-purple-500/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                Contribute a Bang
              </DialogTitle>
              <DialogDescription className="text-base">
                Help improve SearchThing by adding your favorite site
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <h3 className="font-semibold flex items-center gap-2">
                  <Github size={18} />
                  Create a Pull Request
                </h3>
                <p className="text-sm text-muted-foreground">
                  Add your bang to the repository by submitting a PR on GitHub.
                </p>
                <Button 
                  variant="outline" 
                  className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200"
                  onClick={() => window.open("https://github.com/eliasnau/searchthing", "_blank")}
                >
                  Open GitHub Repository
                </Button>
              </div>
              
              <div className="space-y-3 rounded-lg border p-4 hover:bg-accent/50 transition-colors">
                <h3 className="font-semibold flex items-center gap-2">
                  <Mail size={18} />
                  Send an Email
                </h3>
                <p className="text-sm text-muted-foreground">
                  Email us with the site name, URL pattern, and preferred bang command.
                </p>
                <Button 
                  variant="outline"
                  className="w-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 transition-all duration-200"
                  onClick={() => window.location.href = "mailto:contact@eliasnau.dev?subject=New%20Bang%20Suggestion"}
                >
                  Send Email
                </Button>
              </div>
              
              <div className="space-y-3 rounded-lg border p-4">
                <h3 className="font-semibold">Bang Format</h3>
                <pre className="bg-muted p-3 rounded-md text-xs overflow-auto font-mono">
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
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
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