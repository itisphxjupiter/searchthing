"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Search, Command, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FavoriteSelector, popularSites } from "@/components/onboarding/favorite-selector";
import { MockSearch } from "@/components/onboarding/mock-search";
import { EngineSelector } from "@/components/onboarding/engine-selector";

const steps = [
    {
        title: "Welcome to SearchThing",
        description: "Your command center for quick web searches. Let's get you started with a quick tour.",
        icon: <Search className="w-12 h-12 text-purple-500" />,
    },
    {
        title: "Choose Your Favorites",
        description: "Select websites you frequently visit for quick access from your homepage.",
        icon: <Star className="w-12 h-12 text-purple-500" />,
        interactive: "favorites",
    },
    {
        title: "Choose Default Search Engine",
        description: "Select your preferred search engine for when you don't use a bang command.",
        icon: <Search className="w-12 h-12 text-purple-500" />,
        interactive: "engine",
    },
    {
        title: "Try Bang Commands",
        description: "Bang commands let you search directly on specific websites. Try it out!",
        icon: <Command className="w-12 h-12 text-purple-500" />,
        interactive: "search",
    },
    {
        title: "You're All Set!",
        description: "Start searching smarter with SearchThing. You can always revisit this tutorial from the settings page.",
        icon: <Zap className="w-12 h-12 text-purple-500" />,
    },
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);
    const [defaultEngine, setDefaultEngine] = useState("g");
    const [progressWidth, setProgressWidth] = useState(0);
    const router = useRouter();

    // Update progress bar smoothly
    useEffect(() => {
        setProgressWidth(((currentStep) / (steps.length - 1)) * 100);
    }, [currentStep]);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setDirection(1);
            setCurrentStep((prev) => prev + 1);

            if (steps[currentStep].interactive === "favorites" && selectedFavorites.length > 0) {
                const favoritesToSave = popularSites
                    .filter(site => selectedFavorites.includes(site.name))
                    .map(site => ({ name: site.name, url: site.url }));

                localStorage.setItem("favorites", JSON.stringify(favoritesToSave));
            }

            // Save default engine when moving past the engine step
            if (steps[currentStep].interactive === "engine") {
                // Save to settings object if it exists
                const savedSettings = localStorage.getItem("settings");
                if (savedSettings) {
                    const settings = JSON.parse(savedSettings);
                    settings.defaultEngine = defaultEngine;
                    localStorage.setItem("settings", JSON.stringify(settings));
                } else {
                    // Create new settings object
                    localStorage.setItem("settings", JSON.stringify({
                        defaultEngine: defaultEngine,
                        openInNewTab: false,
                        showFavorites: true,
                        autoFocus: true
                    }));
                }
            }
        } else {
            // Completed onboarding
            localStorage.setItem("onboardingCompleted", "true");
            router.push("/");
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setDirection(-1);
            setCurrentStep((prev) => prev - 1);
        }
    };

    const skipOnboarding = () => {
        localStorage.setItem("onboardingCompleted", "true");
        router.push("/");
    };

    const handleFavoritesChange = (favorites: string[]) => {
        setSelectedFavorites(favorites);
    };

    const handleEngineChange = (engine: string) => {
        setDefaultEngine(engine);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-background">
            <div className="px-4 w-full max-w-3xl">
                <motion.div
                    className="overflow-hidden relative rounded-xl border shadow-lg bg-card"
                    layout
                    layoutId="onboarding-card"
                >
                    <div className="w-full h-1 bg-muted">
                        <motion.div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressWidth}%` }}
                            transition={{ duration: 0.2 }}
                        />
                    </div>

                    <div className="p-8">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={currentStep}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.15 },
                                }}
                                className="flex flex-col items-center text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0 }}
                                    className="p-4 mb-6 bg-purple-100 rounded-full dark:bg-purple-900/20"
                                >
                                    {steps[currentStep].icon}
                                </motion.div>

                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0 }}
                                    className="mb-4 text-2xl font-bold"
                                >
                                    {steps[currentStep].title}
                                </motion.h2>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.2, delay: 0 }}
                                    className="mb-8 max-w-md text-muted-foreground"
                                >
                                    {steps[currentStep].description}
                                </motion.p>

                                {/* Interactive elements based on step */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: 0 }}
                                >
                                    {steps[currentStep].interactive === "favorites" && (
                                        <FavoriteSelector
                                            onFavoritesChange={handleFavoritesChange}
                                            initialFavorites={selectedFavorites}
                                        />
                                    )}

                                    {steps[currentStep].interactive === "search" && (
                                        <MockSearch defaultEngine={defaultEngine} />
                                    )}

                                    {steps[currentStep].interactive === "engine" && (
                                        <EngineSelector
                                            defaultEngine={defaultEngine}
                                            onEngineChange={handleEngineChange}
                                        />
                                    )}
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex justify-between mt-8">
                            <div>
                                {currentStep > 0 ? (
                                    <Button variant="outline" onClick={prevStep}>
                                        <ArrowLeft className="mr-2 w-4 h-4" />
                                        Back
                                    </Button>
                                ) : (
                                    <Button variant="outline" onClick={skipOnboarding}>
                                        Skip
                                    </Button>
                                )}
                            </div>
                            <Button onClick={nextStep} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-purple-600 hover:to-pink-600">
                                {currentStep < steps.length - 1 ? (
                                    <>
                                        Next
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </>
                                ) : (
                                    "Get Started"
                                )}
                            </Button>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-4 text-sm text-center text-muted-foreground">
                    <Link href="/" className="hover:text-foreground">
                        Return to home
                    </Link>
                </div>
            </div>
        </div>
    );
}