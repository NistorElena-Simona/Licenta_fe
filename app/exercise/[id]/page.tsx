"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function UpdateExercisePage() {
  const { toast } = useToast();
  const params = useParams();
  const router = useRouter();
  // id-ul exercițiului este params.id
  const id = params.id as string;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    muscleId: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const res = await fetch(`http://localhost:3000/exercises/${id}`);
        if (!res.ok) throw new Error("Failed to fetch exercise");
        const data = await res.json();
        setFormData({
          name: data.name || "",
          description: data.description || "",
          imageUrl: data.imageUrl || "",
          muscleId: data.muscleId ? data.muscleId.toString() : ""
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
    if (id) fetchExercise();
  }, [id, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
      <h1 className="text-3xl font-bold mb-8">Update Exercise</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-semibold">Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="block font-semibold">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="block font-semibold">Image URL</label>
          <input
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="muscleId" className="block font-semibold">Muscle ID</label>
          <input
            id="muscleId"
            name="muscleId"
            type="number"
            value={formData.muscleId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
}
