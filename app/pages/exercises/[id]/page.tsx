"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getExercisesByMuscleId } from "@/app/services/ExercisesService";

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
      <div className="flex flex-col gap-4">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{exercise.name}</h2>
            {exercise.description && (
              <p className="text-gray-600 mt-2">{exercise.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExercisesPage;