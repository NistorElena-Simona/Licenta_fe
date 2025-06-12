"use client"

import { useAuth } from "@/components/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { getMuscles } from "@/app/services/MuscleService";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

function MusclesPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [muscles, setMuscles] = useState<any[]>([]);
  const [isLoadingMuscles, setIsLoadingMuscles] = useState(false);

  // Obține query-ul de căutare din URL (din navbar)
  const searchQuery = searchParams.get('search') || '';

  // Filtrează mușchii bazat pe query-ul de căutare din navbar
  const filteredMuscles = useMemo(() => {
    if (!searchQuery.trim()) {
      return muscles;
    }

    const query = searchQuery.toLowerCase().trim();
    return muscles.filter(muscle => {
      const muscleName = muscle.name ? muscle.name.toLowerCase() : '';
      const muscleDescription = muscle.description ? muscle.description.toLowerCase() : '';
      
      return muscleName.includes(query) || muscleDescription.includes(query);
    });
  }, [muscles, searchQuery]);

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
    <div className="min-h-screen py-12" style={{ background: 'radial-gradient(circle at 50% 0%, #b3cfff 0%, #1e3a8a 80%, #0a1747 100%)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6 text-foreground">Muscles</h2>
        
        {/* Afișează rezultatele căutării dacă există */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-foreground/80 text-lg">
              {filteredMuscles.length > 0 
                ? `Found ${filteredMuscles.length} muscle${filteredMuscles.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `No muscles found for "${searchQuery}"`
              }
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {filteredMuscles.length > 0 ? (
            filteredMuscles.map((muscle) => (
              <Card 
                key={muscle.id} 
                className="flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow bg-background/90 backdrop-blur-sm" 
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
                  <p className="text-foreground text-sm text-center">{muscle.description}</p>
                </CardFooter>
              </Card>
            ))
          ) : searchQuery ? (
            <div className="col-span-full text-center py-12">
              <p className="text-foreground/60 text-lg">No muscles found matching your search.</p>
              <p className="text-foreground/40 mt-2">Try searching for different muscle names or descriptions.</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MusclesPage;


