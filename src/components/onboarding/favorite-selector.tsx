"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Youtube, Github, Twitter, Instagram, Mail, ShoppingCart, Map, Music, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

// Popular websites with custom colors
const popularSites = [
    { name: "YouTube", icon: <Youtube className="w-6 h-6" />, url: "https://youtube.com", bang: "!yt", color: "#FF0000" },
    { name: "GitHub", icon: <Github className="w-6 h-6" />, url: "https://github.com", bang: "!gh", color: "#333333" },
    { name: "Twitter", icon: <Twitter className="w-6 h-6" />, url: "https://twitter.com", bang: "!tw", color: "#1DA1F2" },
    { name: "Instagram", icon: <Instagram className="w-6 h-6" />, url: "https://instagram.com", bang: "!ig", color: "#E1306C" },
    { name: "Gmail", icon: <Mail className="w-6 h-6" />, url: "https://mail.google.com", bang: "!gm", color: "#D44638" },
    { name: "Amazon", icon: <ShoppingCart className="w-6 h-6" />, url: "https://amazon.com", bang: "!a", color: "#FF9900" },
    { name: "Google Maps", icon: <Map className="w-6 h-6" />, url: "https://maps.google.com", bang: "!maps", color: "#4285F4" },
    { name: "Spotify", icon: <Music className="w-6 h-6" />, url: "https://spotify.com", bang: "!sp", color: "#1DB954" },
    { name: "Wikipedia", icon: <BookOpen className="w-6 h-6" />, url: "https://wikipedia.org", bang: "!w", color: "#000000" },
];

interface FavoriteSelectorProps {
    onFavoritesChange: (favorites: string[]) => void;
    initialFavorites?: string[];
}

export function FavoriteSelector({ onFavoritesChange, initialFavorites = [] }: FavoriteSelectorProps) {
    const [selectedFavorites, setSelectedFavorites] = useState<string[]>(initialFavorites);

    useEffect(() => {
        onFavoritesChange(selectedFavorites);
    }, [selectedFavorites, onFavoritesChange]);

    const toggleFavorite = (siteName: string) => {
        setSelectedFavorites(prev =>
            prev.includes(siteName)
                ? prev.filter(name => name !== siteName)
                : [...prev, siteName]
        );
    };

    return (
        <div className="mb-8 w-full max-w-md">
            <div className="grid grid-cols-3 gap-3">
                {popularSites.map((site, index) => {
                    const isSelected = selectedFavorites.includes(site.name);
                    const siteColor = site.color;

                    return (
                        <motion.div
                            key={site.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 + index * 0.05, duration: 0.3 }}
                            className={cn(
                                "flex flex-col justify-center items-center p-3 rounded-lg border-2 transition-all cursor-pointer",
                                isSelected
                                    ? "border-current"
                                    : "border-transparent bg-muted/50 hover:bg-muted"
                            )}
                            onClick={() => toggleFavorite(site.name)}
                            style={{
                                color: isSelected ? siteColor : "currentColor",
                                backgroundColor: isSelected ? `${siteColor}15` : undefined
                            }}
                        >
                            <div className="p-2 mb-2 rounded-full bg-background">
                                {site.icon}
                            </div>
                            <span className="text-xs font-medium">{site.name}</span>
                        </motion.div>
                    );
                })}
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-4 text-xs text-center text-muted-foreground"
            >
                You can add more favorites later in Settings
            </motion.p>
        </div>
    );
}

export { popularSites };