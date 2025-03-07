"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bangs } from "@/app/bang";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem("settings") || "{}");
    if (settings.autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip if using modifier keys (CMD, CTRL, etc.)
      if (event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (inputRef.current && document.activeElement !== inputRef.current) {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          !event.key.match(/^[a-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]$/)
        )
          return;

        inputRef.current.focus();
        const newValue = inputRef.current.value + event.key;
        setQuery(newValue);
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const settings = JSON.parse(localStorage.getItem("settings") || "{}");
      if (settings.openInNewTab) {
        const anchor = document.createElement("a");
        anchor.href = `/search?q=${encodeURIComponent(query)}`;
        anchor.target = "_blank";
        anchor.click();
      } else {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        <div className="absolute inset-0 transition duration-300 rounded-lg opacity-25 bg-gradient-to-r from-purple-500 to-pink-500 blur group-hover:opacity-40"></div>
        <div className="relative flex items-center w-full">
          <div className="relative flex-1">
            <div className="absolute -translate-y-1/2 left-3 top-1/2 text-muted-foreground">
              <Search size={18} />
            </div>
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search the web..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                router.prefetch("/search");
              }}
              className="w-full py-6 pl-10 pr-20 rounded-lg border-input focus-visible:ring-0 focus-visible:ring-purple-500"
            />
          </div>
          <Button
            type="submit"
            className="absolute px-4 py-2 text-white rounded-md right-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
