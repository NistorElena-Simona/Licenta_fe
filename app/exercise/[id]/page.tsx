"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { getMuscles } from "@/app/services/MuscleService";

interface Muscle {
  id: number;
  name: string;
}

export default function UpdateExercisePage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  // id-ul exercițiului este params.id
  const id = params.id as string;
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    muscleId: "",
    videoUrl: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both exercise and muscles data
        const [exerciseRes, musclesData] = await Promise.all([
          fetch(`http://localhost:3000/exercises/${id}`),
          getMuscles()
        ]);
        
        if (!exerciseRes.ok) throw new Error("Failed to fetch exercise");
        const exerciseData = await exerciseRes.json();
        
        setMuscles(musclesData);
        setFormData({
          name: exerciseData.name || "",
          description: exerciseData.description || "",
          imageUrl: exerciseData.imageUrl || "",
          muscleId: exerciseData.muscleId ? exerciseData.muscleId.toString() : "",
          videoUrl: exerciseData.videoUrl || ""
        });
      } catch (err) {
        setError("Failed to load exercise data");
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Nu s-a putut încărca datele exercițiului",
        });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/exercises/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          muscleId: parseInt(formData.muscleId)
        })
      });
      if (!res.ok) throw new Error("Failed to update exercise");
      toast({
        title: "Succes",
        description: "Exercițiul a fost actualizat cu succes!",
      });
      router.push(`/exercises/${formData.muscleId}`);
    } catch (err) {
      setError("Failed to update exercise");
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A apărut o eroare la actualizarea exercițiului",
      });
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4" />
        Go back
      </Button>
      
      <h1 className="text-3xl font-bold mb-8">Update Exercise</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <Label htmlFor="muscle">Muscle</Label>
          <Select
            value={formData.muscleId}
            onValueChange={(value: string) => setFormData({ ...formData, muscleId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a muscle" />
            </SelectTrigger>
            <SelectContent>
              {muscles.map((muscle) => (
                <SelectItem key={muscle.id} value={muscle.id.toString()}>
                  {muscle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Exercise name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter the name of the exercise"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter description of the exercise"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="Enter the image URL"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoUrl">Video URL</Label>
          <Input
            id="videoUrl"
            type="url"
            value={formData.videoUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="Enter the video URL"
          />
        </div>

        <Button type="submit">Update exercise</Button>
      </form>
    </div>
  );
}
