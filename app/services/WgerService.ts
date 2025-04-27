import axios from 'axios';

const WGER_API_URL = 'https://wger.de/api/v2';
const WGER_API_KEY = process.env.NEXT_PUBLIC_WGER_API_KEY; // Trebuie să adaugi acest token în fișierul .env.local

const wgerApi = axios.create({
  baseURL: WGER_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${WGER_API_KEY}`
  },
});

export interface WgerExercise {
  id: number;
  name: string;
  description: string;
  category: number;
  muscles: number[];
  equipment: number[];
  language: number;
  license: number;
  license_author: string;
}

export interface WgerExerciseImage {
  id: number;
  exercise: number;
  image: string;
  is_main: boolean;
}

export interface WgerExerciseVideo {
  id: number;
  exercise: number;
  video: string;
  is_main: boolean;
}

export const getExercises = async (language: number = 2) => { // 2 = English
  try {
    const response = await wgerApi.get('/exercise/', {
      params: {
        language: language,
        limit: 100 // Număr maxim de exerciții de returnat
      }
    });
    return response.data.results as WgerExercise[];
  } catch (error) {
    console.error('Error fetching exercises from wger:', error);
    throw error;
  }
};

export const getExerciseVideos = async (exerciseId: number) => {
  try {
    const response = await wgerApi.get('/video/', {
      params: {
        exercise: exerciseId
      }
    });
    return response.data.results as WgerExerciseVideo[];
  } catch (error) {
    console.error('Error fetching exercise videos:', error);
    throw error;
  }
};

export const getExerciseImages = async (exerciseId: number) => {
  try {
    const response = await wgerApi.get('/exerciseimage/', {
      params: {
        exercise: exerciseId
      }
    });
    return response.data.results as WgerExerciseImage[];
  } catch (error) {
    console.error('Error fetching exercise images:', error);
    throw error;
  }
}; 