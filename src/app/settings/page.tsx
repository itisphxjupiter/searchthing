"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Footer } from "@/components/footer";
import { ArrowLeft, Plus, Trash2, Heart, Github } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bangs } from "@/lib/bang";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Favorite {
  name: string;
  url: string;
}

interface Settings {
  defaultEngine: string; // This already exists in your code
  openInNewTab: boolean;
  showFavorites: boolean;
  autoFocus: boolean;
}

export default function SettingsPage() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [settings, setSettings] = useState<Settings>({
    defaultEngine: "google",
    openInNewTab: false,
    showFavorites: true,
    autoFocus: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    // Check for defaultEngine in localStorage
    const savedEngine = localStorage.getItem("defaultEngine");
    if (savedEngine) {
      setSettings((prev) => ({ ...prev, defaultEngine: savedEngine }));
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem("settings", JSON.stringify(updated));
  };
  const updateDefaultEngine = (value: string) => {
    localStorage.setItem("defaultEngine", value);
    updateSettings({ defaultEngine: value });
  };
  const addFavorite = () => {
    if (newName && newUrl) {
      const updated = [...favorites, { name: newName, url: newUrl }];
      setFavorites(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setNewName("");
      setNewUrl("");
    }
  };

  const removeFavorite = (index: number) => {
    const updated = favorites.filter((_, i) => i !== index);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex-none w-full p-4">
        <div className="flex items-center justify-between w-full max-w-5xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 p-2 transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/eliasnau/searchthing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors text-muted-foreground hover:text-foreground"
            >
              <Github size={18} />
              <span className="text-xs">GitHub</span>
            </a>
            <a
              href="https://ko-fi.com/eliasnau"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-pink-600 transition-colors rounded-md bg-pink-50 dark:bg-pink-950/30 dark:text-pink-300 hover:bg-pink-100 dark:hover:bg-pink-900/30"
            >
              <Heart size={14} className="text-pink-500" />
              <span className="text-xs">Donate</span>
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container relative flex-1 max-w-5xl px-4 py-12 mx-auto">
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 sm:text-6xl">
            Settings
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Customize your search experience
          </p>
        </div>

        <div className="max-w-2xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Favorites</h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Add your favorite websites for quick access on the homepage
              </p>
              <div className="flex items-center gap-2">
                <Label className="text-sm text-muted-foreground">
                  Show on homepage
                </Label>
                <Switch
                  checked={settings.showFavorites}
                  onCheckedChange={(checked) =>
                    updateSettings({ showFavorites: checked })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Name (e.g., GitHub)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <Input
                    placeholder="URL (e.g., https://github.com)"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                  />
                </div>
                <Button
                  onClick={addFavorite}
                  className="self-end bg-foreground text-background hover:bg-foreground/90"
                  disabled={!newName || !newUrl}
                >
                  <Plus size={18} />
                </Button>
              </div>

              <div className="grid gap-4">
                {favorites.map((favorite, index) => (
                  <div
                    key={index}
                    className="relative p-4 overflow-hidden transition-colors border rounded-lg group bg-card hover:bg-accent/50"
                  >
                    <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 group-hover:opacity-100" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{favorite.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {favorite.url}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFavorite(index)}
                        className="transition-colors text-muted-foreground hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </div>
                ))}

                {favorites.length === 0 && (
                  <div className="py-8 text-center rounded-lg text-muted-foreground bg-muted/30">
                    No favorites added yet. Add your first one above!
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Search Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Default Search Engine</Label>
                  <p className="text-sm text-muted-foreground">
                    Choose your preferred search engine
                  </p>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-[200px] justify-between"
                    >
                      {settings.defaultEngine
                        ? bangs.find(
                            (bang) => bang.t === settings.defaultEngine
                          )?.s || "Select engine..."
                        : "Select engine..."}
                      <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search engine..." />
                      <CommandList>
                        <CommandEmpty>No engine found.</CommandEmpty>
                        <CommandGroup>
                          {bangs.map((bang) => (
                            <CommandItem
                              key={bang.t}
                              value={bang.t}
                              onSelect={(currentValue) => {
                                updateDefaultEngine(currentValue);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  settings.defaultEngine === bang.t
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {bang.s} (!{bang.t})
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Open in New Tab</Label>
                  <p className="text-sm text-muted-foreground">
                    Open search results in a new tab
                  </p>
                </div>
                <Switch
                  checked={settings.openInNewTab}
                  onCheckedChange={(checked) =>
                    updateSettings({ openInNewTab: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-0.5">
                  <Label>Auto-focus Search</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically focus search bar on page load
                  </p>
                </div>
                <Switch
                  checked={settings.autoFocus}
                  onCheckedChange={(checked) =>
                    updateSettings({ autoFocus: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
