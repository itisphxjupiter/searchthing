"use client";

import { useState, useEffect } from "react";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface IntroPopupProps {
    onDismiss?: () => void;
}

export function IntroPopup({ onDismiss }: IntroPopupProps) {
    const [showIntro, setShowIntro] = useState(false);
    const [introChecked, setIntroChecked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Check intro dismissed status
        const introDismissed = localStorage.getItem("introDismissed");
        if (introDismissed !== "true") {
            setShowIntro(true);
        }
        setIntroChecked(true);
    }, []);

    const dismissIntro = (neverShowAgain = false) => {
        setShowIntro(false);
        if (neverShowAgain) {
            localStorage.setItem("introDismissed", "true");
        }
        if (onDismiss) {
            onDismiss();
        }
    };

    const learnMore = () => {
        window.open("/onboarding", "_blank");
        localStorage.setItem("introDismissed", "true");
        setShowIntro(false);
        if (onDismiss) {
            onDismiss();
        }
    };

    const startOnboarding = () => {
        localStorage.setItem("introDismissed", "true");
        setShowIntro(false);
        if (onDismiss) {
            onDismiss();
        }
        router.push("/onboarding");
    };

    if (!introChecked || !showIntro) {
        return null;
    }

    return (
        <div className="overflow-hidden fixed right-4 bottom-4 z-50 w-96 rounded-lg border shadow-lg backdrop-blur-sm bg-card/95 animate-in slide-in-from-bottom-5">
            <div className="absolute inset-0 bg-gradient-to-r pointer-events-none from-purple-500/5 to-pink-500/5" />
            <div className="flex relative justify-between items-center p-5 border-b">
                <div className="flex gap-3 items-center">
                    <div className="p-2 rounded-full bg-purple-500/10">
                        <Info size={18} className="text-purple-500" />
                    </div>
                    <h3 className="text-lg font-medium">What's SearchThing?</h3>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 rounded-full hover:bg-muted"
                    onClick={() => dismissIntro(false)}
                >
                    <X size={16} />
                </Button>
            </div>
            <div className="relative p-5">
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                    SearchThing is your command center for quick web searches. Use bang commands like <span className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">!yt</span> for YouTube or <span className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">!w</span> for Wikipedia to search directly on hundreds of websites.
                </p>
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => dismissIntro(true)}
                    >
                        Don't show again
                    </Button>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={learnMore}
                        >
                            Next Time
                        </Button>
                        <Button
                            size="sm"
                            className="text-xs text-white bg-gradient-to-r from-purple-500 to-pink-500 border-0 hover:from-purple-600 hover:to-pink-600"
                            onClick={startOnboarding}
                        >
                            Take the tour
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}