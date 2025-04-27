"use client";

import { useAuth } from "@/components/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMuscles } from "@/app/services/MuscleService";
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
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";

interface Muscle {
  id: number;
  name: string;
}

const exerciseSchema = z.object({
  muscleId: z.string().min(1, "Please select a muscle!"),
  name: z.string().min(4, "Exercise name must be at least 4 characters!"),
  description: z.string().min(6, "Description must be at least 6 characters!"),
  imageUrl: z.string().min(17, "Image URL must be at least 17 characters!"),
  videoURL: z.string().optional(),
});

export default function AddExercisePage() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [muscles, setMuscles] = useState<Muscle[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    muscleId: "",
    videoUrl: "",
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || !isAdmin) {
        router.push("/");
        return;
      }

      const fetchMuscles = async () => {
        try {
          const data = await getMuscles();
          setMuscles(data);
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Eroare",
            description: "Nu s-au putut încărca mușchii din baza de date",
          });
        }
      };

      fetchMuscles();
    }
  }, [isLoading, isAuthenticated, isAdmin, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validare cu zod
    const result = exerciseSchema.safeParse(formData);
    if (!result.success) {
      const errors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0]] = err.message;
          toast({
            variant: "destructive",
            title: "Eroare",
            description: err.message,
          });
        }
      });
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    try {
      const res = await fetch("http://localhost:3000/exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          muscleId: parseInt(formData.muscleId)
        })
      });
      if (!res.ok) throw new Error("Failed to add exercise");
      toast({
        title: "Succes",
        description: "Exercițiul a fost adăugat cu succes!",
      });
      router.push("/muscles");
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: err.message || "Nu s-a putut adăuga exercițiul",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      
       <Button variant="ghost" className="flex items-center gap-2" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
          Go back
        </Button>
      <h1 className="text-3xl font-bold mb-8">Add new exercise</h1>
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
          {formErrors.muscleId && <span className="text-red-500 text-sm">{formErrors.muscleId}</span>}
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
          {formErrors.name && <span className="text-red-500 text-sm">{formErrors.name}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Introdu description of the exercise"
            required
          />
          {formErrors.description && <span className="text-red-500 text-sm">{formErrors.description}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="Introdu URL-ul imaginii"
            required
          />
          {formErrors.imageUrl && <span className="text-red-500 text-sm">{formErrors.imageUrl}</span>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="videoURL">Video URL</Label>
          <Input
            id="videoURL"
            type="url"
            value={formData.videoUrl}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="Introdu URL-ul videoului"
            required
          />
          {formErrors.videoURL && <span className="text-red-500 text-sm">{formErrors.videoURL}</span>}
        </div>

        <Button type="submit">Add exercise</Button>
      </form>
    </div>
  );
} 