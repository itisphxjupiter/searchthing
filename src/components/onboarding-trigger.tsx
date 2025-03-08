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
  const router = useRouter();

  const handleClick = () => {
    // Reset onboarding completed flag
    localStorage.removeItem("onboardingCompleted");
    // Navigate to onboarding page
    router.push("/onboarding");
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      <Sparkles className="mr-2 w-4 h-4" />
      Restart Tutorial
    </Button>
  );
}