import { useEffect, useState } from 'react';
import { WgerExerciseVideo, getExerciseVideos } from '@/app/services/WgerService';

interface ExerciseVideoPlayerProps {
  exerciseId: number;
}

export const ExerciseVideoPlayer = ({ exerciseId }: ExerciseVideoPlayerProps) => {
  const [videos, setVideos] = useState<WgerExerciseVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const exerciseVideos = await getExerciseVideos(exerciseId);
        setVideos(exerciseVideos);
      } catch (err) {
        setError('Nu am putut încărca videoclipurile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [exerciseId]);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Se încarcă...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (videos.length === 0) {
    return <div className="text-gray-500 text-center">Nu există videoclipuri disponibile pentru acest exercițiu</div>;
  }

  return (
    <div className="space-y-4">
      {videos.map((video) => (
        <div key={video.id} className="relative aspect-video">
          <video
            controls
            className="w-full h-full rounded-lg"
            src={video.video}
            title={`Video pentru exercițiul ${exerciseId}`}
          />
        </div>
      ))}
    </div>
  );
}; 