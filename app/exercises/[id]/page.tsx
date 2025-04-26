// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { getExercisesByMuscleId } from "@/app/services/ExercisesService";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Play } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import axios from "axios";

// interface Exercise {
//   id: number;
//   name: string;
//   description?: string;
//   imageUrl?: string;
//   muscleId: number;
// }

// interface Muscle {
//   id: number;
//   name: string;
// }

// function ExercisesPage() {
//   const params = useParams();
//   const muscleId = Number(params.id);
//   const [exercises, setExercises] = useState<Exercise[]>([]);
//   const [muscle, setMuscle] = useState<Muscle | null>(null);
//   const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (muscleId) {
//         try {
//           const [exercisesData, muscleResponse] = await Promise.all([
//             getExercisesByMuscleId(muscleId),
//             axios.get(`http://localhost:3000/muscles/${muscleId}`)
//           ]);
//           setExercises(exercisesData);
//           setMuscle(muscleResponse.data);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       }
//     };

//     fetchData();
//   }, [muscleId]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Exerciții pentru {muscle?.name || 'mușchiul selectat'}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {exercises.map((exercise) => (
//           <Card key={exercise.id} className="overflow-hidden">
//             <CardHeader>
//               <CardTitle className="text-xl">{exercise.name}</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {exercise.imageUrl && (
//                 <div className="mb-4 relative">
//                   {exercise.imageUrl.includes('youtube.com') ? (
//                     <>
//                       <img
//                         src={`https://img.youtube.com/vi/${exercise.imageUrl.split('v=')[1]}/hqdefault.jpg`}
//                         alt={exercise.name}
//                         className="w-full h-32 object-cover rounded-lg"
//                       />
//                       <Button
//                         onClick={() => exercise.imageUrl && setSelectedVideo(exercise.imageUrl)}
//                         className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/50 hover:bg-black/70"
//                       >
//                         <Play className="w-8 h-8 text-white" />
//                       </Button>
//                     </>
//                   ) : (
//                     <img
//                       src={exercise.imageUrl}
//                       alt={exercise.name}
//                       className="w-full h-32 object-contain rounded-lg bg-gray-100"
//                     />
//                   )}
//                 </div>
//               )}
//               {exercise.description && (
//                 <p className="text-gray-600">{exercise.description}</p>
//               )}
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
//         <DialogContent className="max-w-4xl">
//           <DialogHeader>
//             <DialogTitle>Video</DialogTitle>
//           </DialogHeader>
//           {selectedVideo && (
//             <iframe
//               src={selectedVideo.replace('watch?v=', 'embed/')}
//               className="w-full aspect-video rounded-lg"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default ExercisesPage;
"use client";

import ExercisesClient from "./ExercisesClient";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExercisesPage() {
  const router = useRouter();

  return (
    <ExercisesClient />
  );
}