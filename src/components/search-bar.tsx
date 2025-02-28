"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `https://searchthing.xyz/?q=${encodeURIComponent(query)}`
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative flex items-center w-full">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search size={18} />
            </div>
            <Input
              type="text"
              placeholder="Search the web..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-6 rounded-lg border-input focus-visible:ring-2 focus-visible:ring-purple-500"
            />
          </div>
          <Button
            type="submit"
            className="absolute right-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-md px-4 py-2"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  )
}

