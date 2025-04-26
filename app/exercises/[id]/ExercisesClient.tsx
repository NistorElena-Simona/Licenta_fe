"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getExercisesByMuscleId } from "@/app/services/ExercisesService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import axios from "axios";
import { useAuth } from "@/components/context/AuthContext";


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
  const muscleId = Number(params.id);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [muscle, setMuscle] = useState<Muscle | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (muscleId) {
        try {
          const [exercisesData, muscleResponse] = await Promise.all([
            getExercisesByMuscleId(muscleId),
            axios.get(`http://localhost:3000/muscles/${muscleId}`)
          ]);
          setExercises(exercisesData);
          setMuscle(muscleResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [muscleId]);

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
            <h1 className="text-3xl font-bold">Exercises for {muscle?.name || 'mușchiul selectat'}</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="overflow-hidden">
                <CardHeader>
                  <CardTitle
                    className="flex text-xl justify-center items-center text-center min-h-[56px] h-[56px] w-full"
                  >
                    {exercise.name}
                  </CardTitle>
                </CardHeader>
                <CardContent >
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
                  {isAdmin && (
                    <div className="flex justify-between mt-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:text-blue-700 "
                        onClick={() => router.push(`/exercise/${exercise.id}`)}
                        aria-label="Edit"
                      >
                        <Edit className="w-6 h-6"/>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-700"
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this exercise?")) {
                            await fetch(`http://localhost:3000/exercises/${exercise.id}`, { method: "DELETE" });
                            setExercises(exercises.filter(ex => ex.id !== exercise.id));
                          }
                        }}
                        aria-label="Delete"
                      >
                        <Trash />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 