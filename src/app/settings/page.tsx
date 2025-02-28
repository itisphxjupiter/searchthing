"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Favorite {
  name: string
  url: string
}

export default function SettingsPage() {
  const [favorites, setFavorites] = useState<Favorite[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [newName, setNewName] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const addFavorite = (e: React.FormEvent) => {
    e.preventDefault()
    if (newName && newUrl) {
      const newFavorites = [...favorites, { name: newName, url: newUrl }]
      setFavorites(newFavorites)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      setNewName("")
      setNewUrl("")
    }
  }

  const removeFavorite = (index: number) => {
    const newFavorites = favorites.filter((_, i) => i !== index)
    setFavorites(newFavorites)
    localStorage.setItem('favorites', JSON.stringify(newFavorites))
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>
        
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Favorites</h2>
          
          <form onSubmit={addFavorite} className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="flex-1"
              />
              <Input
                placeholder="URL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>
          </form>

          <div className="grid gap-2">
            {favorites.map((favorite, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted rounded-lg"
              >
                <div>
                  <p className="font-medium">{favorite.name}</p>
                  <p className="text-sm text-muted-foreground">{favorite.url}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFavorite(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}