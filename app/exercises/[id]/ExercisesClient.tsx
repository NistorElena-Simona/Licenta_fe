"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getExercisesByMuscleId } from "@/app/services/ExercisesService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash, Heart } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/components/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Exercise {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  muscleId: number;
}

interface Muscle {
  id: number;
  name: string;
}

export default function ExercisesClient() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { isAuthenticated, isAdmin, accessToken } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscle, setMuscle] = useState<Muscle | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        try {
          const [exercisesData, muscleResponse] = await Promise.all([
            getExercisesByMuscleId(Number(params.id)),
            axios.get(`http://localhost:3000/muscles/${params.id}`)
          ]);
          setExercises(exercisesData);
          setMuscle(muscleResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    const fetchFavorites = async () => {
      if (isAuthenticated && accessToken) {
        try {
          const response = await fetch("http://localhost:3000/favorites", {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            setFavorites(data.map((fav: any) => fav.exerciseId));
          }
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      }
    };

    fetchData();
    fetchFavorites();
  }, [params.id, isAuthenticated, accessToken]);

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const response = await fetch(`http://localhost:3000/exercises/${deleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setExercises(exercises.filter(ex => ex.id !== deleteId));
        toast({
          title: "Succes",
          description: "Exercițiul a fost șters cu succes!",
        });
      } else {
        throw new Error('Failed to delete exercise');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut șterge exercițiul",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const toggleFavorite = async (exerciseId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Trebuie să fii autentificat pentru a adăuga exerciții la favorite",
      });
      router.push('/pages/login');
      return;
    }

    try {
      const isFavorite = favorites.includes(exerciseId);
      
      // Verificăm dacă încercăm să adăugăm un nou exercițiu și avem deja 20
      if (!isFavorite && favorites.length >= 20) {
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Nu poți adăuga mai mult de 20 de exerciții la favorite",
        });
        return;
      }

      const method = isFavorite ? 'DELETE' : 'POST';
      const url = isFavorite 
        ? `http://localhost:3000/favorites/${exerciseId}`
        : 'http://localhost:3000/favorites';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        ...(method === 'POST' && { body: JSON.stringify({ exerciseId }) })
      });

      if (response.ok) {
        if (isFavorite) {
          setFavorites(favorites.filter(id => id !== exerciseId));
          toast({
            title: "Succes",
            description: "Exercițiul a fost eliminat din favorite",
          });
        } else {
          setFavorites([...favorites, exerciseId]);
          toast({
            title: "Succes",
            description: "Exercițiul a fost adăugat la favorite",
          });
        }
      } else {
        throw new Error('Failed to update favorite status');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "Nu s-a putut actualiza statusul favorit",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-foreground hover:bg-muted/50"
              onClick={() => router.push("/muscles")}
            >
              <ArrowLeft className="h-4 w-4" />
              Go to muscle
            </Button>
           
          </div>
          <h1 className="text-3xl font-bold flex justify-center items-center pb-4">Exercises for {muscle?.name || 'mușchiul selectat'}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <Card
                key={exercise.id}
                className="overflow-hidden cursor-pointer"
                onClick={() => router.push(`/video/${exercise.id}`)}
              >
                <CardHeader>
                  <CardTitle
                    className="flex text-xl justify-center items-center text-center min-h-[56px] h-[56px] w-full"
                  >
                    {exercise.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {exercise.imageUrl && (
                    <div className="mb-4 relative">
                      <img
                        src={exercise.imageUrl}
                        alt={exercise.name}
                        className="w-full h-32 object-contain rounded-lg bg-gray-100"
                      />
                    </div>
                  )}
                  {exercise.description && (
                    <p className="text-gray-600 min-h-[48px]">{exercise.description}</p>
                  )}
                  <div className="flex justify-between mt-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`${favorites.includes(exercise.id) ? 'text-red-600' : 'text-gray-600'} hover:text-red-700`}
                      onClick={(e) => toggleFavorite(exercise.id, e)}
                      aria-label="Favorite"
                    >
                      <Heart className={`w-6 h-6 ${favorites.includes(exercise.id) ? 'fill-current' : ''}`} />
                    </Button>
                    {isAdmin && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-blue-600 hover:text-blue-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/exercise/${exercise.id}`);
                          }}
                          aria-label="Edit"
                        >
                          <Edit className="w-6 h-6"/>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteId(exercise.id);
                          }}
                          aria-label="Delete"
                        >
                          <Trash className="w-6 h-6" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Șterge exercițiul</DialogTitle>
          </DialogHeader>
          <p>Ești sigur că vrei să ștergi acest exercițiu?</p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteId(null)}>Anulează</Button>
            <Button variant="destructive" onClick={handleDelete}>Șterge</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 