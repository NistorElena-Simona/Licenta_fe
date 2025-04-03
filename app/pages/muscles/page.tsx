"use client"

import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ExercisesPage() {

  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/?from=/pages/muscles');
    }
  }, [isLoading, isAuthenticated, router]);


  const exercises = [
    { name: "Abs", count: 28 },
    { name: "Back", count: 25 },
    { name: "Biceps", count: 24 },
    { name: "Calf", count: 9 },
    { name: "Chest", count: 37 },
    { name: "Forearms", count: 4 },
    { name: "Legs", count: 40 },
    { name: "Shoulders", count: 22 },
    { name: "Triceps", count: 20 },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="p-6 bg-background text-foreground ">
      <h1 className="text-3xl font-bold mb-6">Exercises</h1>

      <div className="flex flex-col gap-5">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="flex items-center bg-rowground border-2 border-gray-400 rounded-lg"
          >
            {/* Imagine specifică pentru fiecare exercițiu */}
            <img
              src={`/images/${exercise.name.toLowerCase()}.jpg`}
              alt={exercise.name}
              className="w-16 h-16 rounded-lg mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{exercise.name}</h2>
              <p className="text-gray-700 dark:text-gray-300">{exercise.count} exercises</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExercisesPage;


