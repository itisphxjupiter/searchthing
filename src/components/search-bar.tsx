"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { bangs } from "@/app/bang"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (inputRef.current && document.activeElement !== inputRef.current) {
        if (
          event.target instanceof HTMLInputElement ||
          !event.key.match(/^[a-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]$/)
        ) return
        inputRef.current.focus()
        inputRef.current.value = event.key // Insert the first key pressed
        setQuery(event.key) // Update state to reflect input
        event.preventDefault()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      window.location.href = `https://searchthing.xyz/search?q=${encodeURIComponent(query)}`
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
              ref={inputRef}
              type="text"
              placeholder="Search the web..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-6 rounded-lg border-input focus-visible:ring-0 focus-visible:ring-purple-500"
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
