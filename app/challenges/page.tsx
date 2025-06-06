"use client";

import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";

interface Challenge {
  id: number;
  name:string;
  description: string;
  

}

export default function ChallengesPage() {
  const { isAuthenticated, isLoading, accessToken, user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/");
        return;
      }

      const fetchChallenges = async () => {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:3000/challenges", {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) throw new Error("Failed to fetch challenges");
          const data = await response.json();
          setChallenges(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Can't load challenges",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchChallenges();
    }
  }, [isLoading, isAuthenticated, router, toast, accessToken]);

  if (isLoading || loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  // Verifică dacă utilizatorul are Premium
  if (!user?.isPremium) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Button variant="ghost" className="flex items-center gap-2 mb-8" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Premium Feature</h2>
            <p className="text-gray-600 mb-6">
              Challenges are available only for Premium users. 
              Upgrade your account to access exclusive fitness challenges and track your progress.
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

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" className="flex items-center gap-2 mb-8" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <h1 className="text-3xl font-bold mb-8 text-center">Challenges</h1>

      <div className="grid gap-6">
        {challenges.map((challenge) => (
          <Card 
            key={challenge.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/challenge/${challenge.id}`)} // presupun că ai o pagină pentru detalii
          >
            <CardHeader>
              <CardTitle className="text-foreground">{challenge.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4 min-h-[80px]">
             
              <Trophy className="w-12 h-12 text-yellow-400" />
                <p className="text-sm line-clamp-3">{challenge.description}</p>
              
            </CardContent>
          </Card>
        ))}

        {challenges.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <p className="text-center text-xl text-gray-400 font-semibold pt-4">No challenges found</p>
          </div>
        )}
      </div>
    </div>
  );
}
