"use client";

import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

type Challenge = {
  id: number;
  name: string;
  description: string;
  duration: number;
  days: {
    id: number;
    dayNumber: number;
    exercises: {
      id: number;
      exerciseId: number;
      sets: number;
      reps: number;
      exercise: {
        name: string;
        description: string;
        imageUrl?: string;
      };
    }[];
  }[];
};

interface ChallengePageClientProps {
  challenge: Challenge;
  children: React.ReactNode;
}

export default function ChallengePageClient({ challenge, children }: ChallengePageClientProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Verifică dacă utilizatorul are Premium
  if (!user?.isPremium) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Button variant="ghost" className="flex items-center gap-2 mb-8" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Premium Feature</h2>
            <p className="text-gray-600 mb-6">
              This challenge "{challenge.name}" is available only for Premium users. 
              Upgrade your account to access exclusive fitness challenges.
            </p>
            <Button 
              onClick={() => router.push('/pages/pricing')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 