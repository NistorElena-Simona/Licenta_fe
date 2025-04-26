"use client"

import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMuscles } from "@/app/services/MuscleService";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

function MusclesPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [muscles, setMuscles] = useState<any[]>([]);
  const [isLoadingMuscles, setIsLoadingMuscles] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) {
        if (!isAuthenticated) {
          router.push('/?from=/muscles');
          return;
        }

        try {
          setIsLoadingMuscles(true);
          const data = await getMuscles();
          setMuscles(data);
        } catch (error) {
          console.error('Error fetching muscles:', error);
        } finally {
          setIsLoadingMuscles(false);
        }
      }
    };

    fetchData();
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || isLoadingMuscles) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-6">Muscles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {muscles.map((muscle) => (
          <Card 
            key={muscle.id} 
            className="flex flex-col items-center cursor-pointer" 
            onClick={() => router.push(`/exercises/${muscle.id}`)}
          >
            <CardHeader>
              <div className="h-48 w-48 relative overflow-hidden rounded-xl">
                <Image
                  src={`/images/${muscle.name.toLowerCase()}.jpg`}
                  alt={muscle.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-2xl font-semibold mb-2">{muscle.name}</h3>
            </CardContent>
            <CardFooter>
              <p className="text-foreground text-sm">{muscle.description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MusclesPage;


