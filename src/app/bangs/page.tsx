"use client"

import { bangs } from "../bang"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { ArrowLeft, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

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
    <div className="min-h-screen flex flex-col bg-background">
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

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-12">
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
      </main>

      <Footer />
    </div>
  )
}