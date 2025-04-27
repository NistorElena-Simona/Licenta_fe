"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface Exercise {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  muscleId: number;
}

export default function VideoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await fetch(`http://localhost:3000/exercises/${id}`);
        if (!res.ok) throw new Error("Can't load the exercise");
        const data = await res.json();
        setExercise(data);
      } catch (err) {
        setExercise(null);
      } finally {
        setLoading(false);
      }
    };
    fetchExercise();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Can't find the exercise.
      </div>
    );
  }

  return (
    <div className="min-h-screen h-screen flex flex-col bg-background overflow-hidden">
      <div className="w-full max-w-3xl mx-auto px-4 pt-8">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to exercises
        </Button>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">{exercise.name}</h1>
        {exercise.videoUrl ? (
          <div className="aspect-video w-full rounded-lg overflow-hidden mb-6">
            <ReactPlayer
              url={exercise.videoUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No video available for this exercise
            </p>
          </div>
        )}
        <p className="text-gray-600">{exercise.description}</p>
      </div>
    </div>
  );
} 