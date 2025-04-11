"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Search, Command, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bangs } from "@/lib/bang";
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
    <div className="px-4 mx-auto w-full max-w-2xl">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-25 blur transition duration-300 group-hover:opacity-40"></div>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-4">
            <Search className="w-5 h-5 text-muted-foreground" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search the web..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              router.prefetch("/search");
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
              }
            }}
            className="py-4 pr-20 pl-12 w-full leading-normal rounded-full border transition-all duration-300 bg-background border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
