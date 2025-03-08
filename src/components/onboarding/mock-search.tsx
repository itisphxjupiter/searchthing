"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { bangs } from "@/lib/bang";

interface MockSearchProps {
    defaultEngine: string;
}

export function MockSearch({ defaultEngine }: MockSearchProps) {
    const [mockSearchQuery, setMockSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState(false);
    const [searchSite, setSearchSite] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleMockSearch = (e: React.FormEvent) => {
        e.preventDefault();

        // Properly extract the bang command from the query
        const bangPattern = /!(\w+)/;
        const match = mockSearchQuery.match(bangPattern);
        const bangCommand = match ? match[1].toLowerCase() : null;

        // Find the matching bang in the bangs array
        const selectedBang = bangCommand
            ? bangs.find(b => b.t === bangCommand)
            : bangs.find(b => b.t === defaultEngine);

        // Fallback to default engine if the bang wasn't found
        const bangToUse = selectedBang || bangs.find(b => b.t === 'g') || bangs[0];

        // Remove the bang command from the query
        const cleanQuery = bangCommand
            ? mockSearchQuery.replace(`!${bangCommand}`, '').trim()
            : mockSearchQuery.trim();

        // Update state with the search information
        setSearchSite(bangToUse.s);
        setSearchTerm(cleanQuery);
        setSearchResult(true);
    };

    return (
        <div className="mb-8 w-full max-w-md">
            <div className="space-y-4">
                <motion.div
                    className="p-4 rounded-lg border bg-muted/50 border-muted"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                >
                    <p className="mb-3 text-sm font-medium">Try these examples:</p>
                    <div className="grid grid-cols-2 gap-2">
                        <motion.div
                            className="p-2 text-xs rounded-md border border-transparent transition-all cursor-pointer bg-background hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300 hover:border-purple-200 dark:hover:border-purple-800"
                            onClick={() => setMockSearchQuery("cooking videos !yt")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            cooking videos <span className="font-semibold text-purple-600 dark:text-purple-400">!yt</span>
                        </motion.div>
                        <motion.div
                            className="p-2 text-xs rounded-md border border-transparent transition-all cursor-pointer bg-background hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300 hover:border-purple-200 dark:hover:border-purple-800"
                            onClick={() => setMockSearchQuery("quantum physics !w")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            quantum physics <span className="font-semibold text-purple-600 dark:text-purple-400">!w</span>
                        </motion.div>
                        <motion.div
                            className="p-2 text-xs rounded-md border border-transparent transition-all cursor-pointer bg-background hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300 hover:border-purple-200 dark:hover:border-purple-800"
                            onClick={() => setMockSearchQuery("!gh react")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="font-semibold text-purple-600 dark:text-purple-400">!gh</span> react
                        </motion.div>
                        <motion.div
                            className="p-2 text-xs rounded-md border border-transparent transition-all cursor-pointer bg-background hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/20 dark:hover:text-purple-300 hover:border-purple-200 dark:hover:border-purple-800"
                            onClick={() => setMockSearchQuery("coffee shops near me !maps")}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            coffee shops near me <span className="font-semibold text-purple-600 dark:text-purple-400">!maps</span>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.form
                    onSubmit={handleMockSearch}
                    className="relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            type="text"
                            placeholder="Type a search with a bang command..."
                            value={mockSearchQuery}
                            onChange={(e) => setMockSearchQuery(e.target.value)}
                            className="py-2 pr-4 pl-10 w-full shadow-sm"
                            autoFocus
                        />
                    </div>
                    <Button
                        type="submit"
                        className="mt-2 w-full text-white bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-sm hover:from-purple-600 hover:to-pink-600"
                    >
                        Search
                    </Button>
                </motion.form>

                <AnimatePresence>
                    {searchResult && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div
                                className="p-4 rounded-lg border shadow-sm bg-card"
                            >
                                <div className="flex gap-2 items-center mb-2">
                                    <div
                                        className="flex justify-center items-center w-8 h-8 text-xs font-bold text-white bg-purple-500 rounded-full"
                                    >
                                        {searchSite?.[0]?.toUpperCase() || 'S'}
                                    </div>
                                    <div className="font-medium">{searchSite}</div>
                                </div>
                                <div className="flex gap-2 items-center text-sm">
                                    <Search size={14} className="text-muted-foreground" />
                                    <span className="text-muted-foreground">Searching for:</span>
                                    <span className="font-medium">{searchTerm}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0 }}
                    className="p-3 text-xs text-center rounded-lg text-muted-foreground bg-muted/30"
                >
                    <p>Bang commands like <span className="font-mono font-bold">!yt</span> can be placed anywhere in your search</p>
                    <p className="mt-1">They let you search directly on specific websites</p>
                </motion.div>
            </div>
        </div>
    );
}