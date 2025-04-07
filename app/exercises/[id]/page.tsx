"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getExercisesByMuscleId } from "@/app/services/ExercisesService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Exercise {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  muscleId: number;
}

function ExercisesPage() {
  const params = useParams();
  const muscleId = Number(params.id);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (muscleId) {
        try {
          const data = await getExercisesByMuscleId(muscleId);
          setExercises(data);
        } catch (error) {
          console.error('Error fetching exercises:', error);
        }
      }
    };

    fetchExercises();
  }, [muscleId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Exerciții pentru mușchiul {muscleId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <Card key={exercise.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">{exercise.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {exercise.imageUrl && (
                <div className="mb-4">
                  {exercise.imageUrl.includes('youtube.com') ? (
                    <iframe
                      src={exercise.imageUrl.replace('watch?v=', 'embed/')}
                      className="w-full aspect-video rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img
                      src={exercise.imageUrl}
                      alt={exercise.name}
                      className="w-full h-32 object-contain rounded-lg bg-gray-100"
                    />
                  )}
                </div>
              )}
              {exercise.description && (
                <p className="text-gray-600">{exercise.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ExercisesPage; 