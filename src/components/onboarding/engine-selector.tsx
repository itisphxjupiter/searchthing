"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { bangs } from "@/lib/bang";

interface EngineSelectorProps {
    defaultEngine: string;
    onEngineChange: (engine: string) => void;
}

interface Settings {
    defaultEngine: string;
    openInNewTab: boolean;
    showFavorites: boolean;
    autoFocus: boolean;
}

export function EngineSelector({ defaultEngine, onEngineChange }: EngineSelectorProps) {
    const [settings, setSettings] = useState<Settings>({
        defaultEngine: "google",
        openInNewTab: false,
        showFavorites: true,
        autoFocus: true,
    });

    useEffect(() => {
        const savedSettings = localStorage.getItem("settings");
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
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

    return (
        <div className="mb-8 w-full max-w-md">
            <div className="space-y-4">
                <motion.div
                    className=""
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                className="w-[200px] justify-between"
                            >
                                {bangs.find((bang) => bang.t === settings.defaultEngine)?.s || "Select engine..."}
                                <ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
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
                                                value={bang.t.toLowerCase()}
                                                onSelect={() => updateDefaultEngine(bang.t)}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        settings.defaultEngine === bang.t ? "opacity-100" : "opacity-0"
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
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-center text-muted-foreground"
                >
                    You can change your default search engine anytime in Settings
                </motion.p>
            </div>
        </div>
    );
}