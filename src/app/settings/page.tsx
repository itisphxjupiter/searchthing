"use client"

import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface Favorite {
  name: string
  url: string
}

interface Settings {
  defaultEngine: string
  openInNewTab: boolean
  showFavorites: boolean
  autoFocus: boolean
}

export default function SettingsPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [newName, setNewName] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const [settings, setSettings] = useState<Settings>({
    defaultEngine: 'google',
    openInNewTab: false,
    showFavorites: true,
    autoFocus: true
  })

  useEffect(() => {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      setFavorites(JSON.parse(saved))
    }
    const savedSettings = localStorage.getItem('settings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings }
    setSettings(updated)
    localStorage.setItem('settings', JSON.stringify(updated))
  }

  const addFavorite = () => {
    if (newName && newUrl) {
      const updated = [...favorites, { name: newName, url: newUrl }]
      setFavorites(updated)
      localStorage.setItem('favorites', JSON.stringify(updated))
      setNewName("")
      setNewUrl("")
    }
  }

  const removeFavorite = (index: number) => {
    const updated = favorites.filter((_, i) => i !== index)
    setFavorites(updated)
    localStorage.setItem('favorites', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="w-full p-4 flex-none">
        <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
          <Link 
            href="/" 
            className="p-2 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer"
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
            Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your search experience
          </p>
        </div>

        <div className="space-y-12 max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Favorites</h2>
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground">Show on homepage</Label>
                <Switch
                  checked={settings.showFavorites}
                  onCheckedChange={(checked) => updateSettings({ showFavorites: checked })}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Label>Name</Label>
                  <Input
                    placeholder="e.g., GitHub"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="cursor-text"
                  />
                  <Input
                    placeholder="e.g., https://github.com"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="cursor-text"
                  />
                </div>
                <Button
                  onClick={addFavorite}
                  className="self-end bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer"
                >
                  <Plus size={18} />
                </Button>
              </div>

              <div className="grid gap-4">
                {favorites.map((favorite, index) => (
                  <div 
                    key={index}
                    className="group relative overflow-hidden rounded-lg border bg-card p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{favorite.name}</h3>
                        <p className="text-sm text-muted-foreground">{favorite.url}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFavorite(index)}
                        className="text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Search Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Default Search Engine</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred search engine
                  </p>
                </div>
                <Select
                  value={settings.defaultEngine}
                  onValueChange={(value) => updateSettings({ defaultEngine: value })}
                >
                  <SelectTrigger className="w-[140px] cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google" className="cursor-pointer">Google</SelectItem>
                    <SelectItem value="duckduckgo" className="cursor-pointer">DuckDuckGo</SelectItem>
                    <SelectItem value="bing" className="cursor-pointer">Bing</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Open in New Tab</Label>
                  <p className="text-sm text-muted-foreground">
                    Open search results in a new tab
                  </p>
                </div>
                <Switch
                  checked={settings.openInNewTab}
                  onCheckedChange={(checked) => updateSettings({ openInNewTab: checked })}
                  className="cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Auto-focus Search</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically focus search bar on page load
                  </p>
                </div>
                <Switch
                  checked={settings.autoFocus}
                  onCheckedChange={(checked) => updateSettings({ autoFocus: checked })}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}