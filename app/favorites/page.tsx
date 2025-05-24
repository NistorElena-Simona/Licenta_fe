"use client";

import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Exercise {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  muscleId: number;
  videoUrl: string;
}

interface FavoriteExercise {
  id: number;
  userId: string;
  exerciseId: number;
  createdAt: string;
  exercise: Exercise;
}

export default function FavoritesPage() {
  const { isAuthenticated, isLoading, accessToken } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<FavoriteExercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/");
        return;
      }

      const fetchFavorites = async () => {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:3000/favorites", {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) throw new Error("Failed to fetch favorites");
          const data = await response.json();
          setFavorites(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Eroare",
            description: "Nu s-au putut încărca exercițiile favorite",
          });
        } finally {
          setLoading(false);
        }
      };

      fetchFavorites();
    }
  }, [isLoading, isAuthenticated, router, toast, accessToken]);

  if (isLoading || loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" className="flex items-center gap-2 mb-8" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Înapoi
      </Button>
      
      <h1 className="flex text-3xl font-bold mb-8 pt-4 justify-center items-center">Exercițiile mele favorite</h1>
      
      <div className="grid gap-6">
        {favorites.map((favorite) => (
          <Card 
            key={favorite.id} 
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/video/${favorite.exerciseId}`)}
          >
            <CardHeader>
              <CardTitle>{favorite.exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <img 
                  src={favorite.exercise.imageUrl} 
                  alt={favorite.exercise.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div>
                  <p className="text-sm text-gray-500 mb-2">Grup muscular: {favorite.exercise.name}</p>
                  <p className="text-sm line-clamp-2">{favorite.exercise.description}</p>
                  
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {favorites.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 animate-pulse">
              <path d="M12 21s-6.716-5.317-9.293-8.293C.37 10.37 0 8.5 0 7a6 6 0 0 1 12 0 6 6 0 0 1 12 0c0 1.5-.37 3.37-2.707 5.707C18.716 15.683 12 21 12 21z" fill="#e11d48"/>
            </svg>
            <p className="text-center text-xl text-gray-400 font-semibold pt-4">Nu ai niciun exercițiu favorit încă.</p>
            <p className="text-center text-gray-500 mt-2">Adaugă exerciții la favorite apăsând pe inimioară!</p>
          </div>
        )}
      </div>
    </div>
  );
} 