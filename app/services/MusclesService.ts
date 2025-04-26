import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Muscle {
  id: number;
  name: string;
}

export const getMuscleById = async (id: number): Promise<Muscle> => {
  try {
    const response = await axios.get(`${API_URL}/muscles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching muscle:', error);
    throw error;
  }
}; 