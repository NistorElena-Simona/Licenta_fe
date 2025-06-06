

import { notFound } from "next/navigation";
import ExerciseCard from "../ExerciseCard";
import ChallengePageClient from "./ChallengePageClient";

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
      exerciseId:number;
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

export default async function ChallengePage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/challenges/${params.id}`, {
    next: { revalidate: 60 },
  });
   
  if (!res.ok) return notFound();

  const challenge: Challenge = await res.json();
  
  return (
    <ChallengePageClient challenge={challenge}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-4">{challenge.name}</h1>
        <p className="text-lg text-foreground mb-2">{challenge.description}</p>
        <p className="text-sm text-foreground mb-6">Duration: {challenge.duration} days</p>

        <div className="flex flex-wrap justify-center gap-6 max-w-[960px] mx-auto">
          {challenge.days.map((day) => (
            <div key={day.id} className="bg-background rounded-2xl shadow-md p-6 ">
              <h2 className="text-2xl font-semibold mb-4 text-center">Day {day.dayNumber}</h2>

              <div className="flex flex-wrap justify-center gap-4 ">
                {day.exercises.map((ex) => (
                   <div key={ex.id} className="w-80 h-96 flex [&>*]:w-full [&>*]:h-full [&_img]:max-h-48 [&_img]:w-full [&_img]:object-contain [&_img]:mx-auto">
                   <ExerciseCard
                      key={ex.id}
                      id={ex.exerciseId}
                      name={ex.exercise.name}
                      description={ex.exercise.description}
                      sets={ex.sets}
                      reps={ex.reps}
                      imageUrl={ex.exercise.imageUrl}
    />
    </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChallengePageClient>
  );
}
