"use client";

import { useRouter } from "next/navigation";

type ExerciseCardProps = {
  id: number;
  name: string;
  description: string;
  sets: number;
  reps: number;
  imageUrl?: string;
};

export default function ExerciseCard({ id, name, description, sets, reps, imageUrl }: ExerciseCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/video/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border rounded-xl p-4 flex flex-col gap-2 bg-gray-50 hover:bg-gray-100 transition"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") handleClick(); }}
    >
      <div className="text-lg font-medium text-black">{name}</div>
      <div className="text-sm text-gray-500">{description}</div>
      <div className="text-sm text-gray-700">Sets: {sets} × : Repetitions{reps}</div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          width={300}
          height={200}
          className="rounded-lg object-cover mt-2"
        />
      )}
    </div>
  );
}
