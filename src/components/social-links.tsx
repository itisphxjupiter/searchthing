"use client"

import { Github, Heart } from "lucide-react"

export function SocialLinks() {
  return (
    <div className="flex justify-center space-x-6 mt-12 mb-6">
      <a 
        href="https://github.com/yourusername/searchthing" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-4 py-2 rounded-md bg-muted/50 hover:bg-muted transition-colors"
      >
        <Github size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">GitHub</span>
      </a>
      <a 
        href="https://buymeacoffee.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group flex items-center gap-2 px-4 py-2 rounded-md bg-pink-50 hover:bg-pink-100 transition-colors dark:bg-pink-950/20 dark:hover:bg-pink-950/30"
      >
        <Heart size={18} className="text-pink-500" />
        <span className="text-sm font-medium text-pink-700 dark:text-pink-300">Donate</span>
      </a>
    </div>
  )
}