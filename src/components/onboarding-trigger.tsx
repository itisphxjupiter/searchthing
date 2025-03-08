"use client";

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface OnboardingTriggerProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function OnboardingTrigger({
  variant = "outline",
  size = "default",
  className = ""
}: OnboardingTriggerProps) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    setHasCompletedOnboarding(onboardingCompleted === "true");
  }, []);

  const startOnboarding = () => {
    router.push("/onboarding");
  };

  if (hasCompletedOnboarding) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={startOnboarding}
      className={`animate-pulse ${className}`}
    >
      <Sparkles className="mr-2 w-4 h-4" />
      Take the tour
    </Button>
  );
}