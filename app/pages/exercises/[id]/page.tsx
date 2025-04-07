// "use client";

// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useAuth } from "@/components/context/AuthContext";
// import { getExercisesByMuscleId } from "@/app/services/ExercisesService";
// import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

// function ExercisesPage() {
//   const { isLoading, isAuthenticated } = useAuth();
//   const searchParams = useSearchParams();
//   const [exercises, setExercises] = useState<any[]>([]);
//   const muscleId = Number(searchParams.get("muscleId"));
//   const router = useRouter();

//   useEffect(() => {
//     if (!isLoading && !isAuthenticated) {
//       router.push('/?from=/pages/exercises');
//     }
//   }, [isLoading, isAuthenticated]);

//   useEffect(() => {
//     const fetchExercises = async () => {
//       if (muscleId) {
//         try {
//           const data = await getExercisesByMuscleId(muscleId);
//           setExercises(data);
//         } catch (error) {
//           console.error('Error fetching exercises:', error);
//         }
//       }
//     };

//     fetchExercises();
//   }, [muscleId]);

//   if (isLoading) {
//     return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return null; 
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <h2 className="text-4xl font-bold mb-6">Exercises for Muscle ID: {muscleId}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//         {exercises.map((exercise) => (
//           <Card key={exercise.id} className="flex flex-col items-center">
//             <CardHeader>
//               <h3 className="text-2xl font-semibold mb-2">{exercise.name}</h3>
//             </CardHeader>
//             <CardContent>
//               <p className="text-gray-600 text-sm">{exercise.description}</p>
//             </CardContent>
//             <CardFooter>
//               <p className="text-foreground text-sm">Difficulty: {exercise.difficulty}</p>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ExercisesPage;

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getExercisesByMuscleId } from "@/app/services/ExercisesService";

interface Exercise {
  id: number;
  name: string;
  description?: string; // Opțional
  imageUrl?: string; // Opțional
  muscleId: number;
}

function ExercisesPage() {
  const searchParams = useSearchParams();
  const muscleId = Number(searchParams.get("muscleId"));
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      if (muscleId) {
        const data = await getExercisesByMuscleId(muscleId);
        setExercises(data);
      }
    };

    fetchExercises();
  }, [muscleId]);

  return (
    <div>
      <h1>Exercises for Muscle ID: {muscleId}</h1>
      <ul>
        {exercises.map((exercise) => (
          <li key={exercise.id}>{exercise.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ExercisesPage;