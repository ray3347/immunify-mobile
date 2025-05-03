import axios, { AxiosError } from 'axios';

// Define the base API URL 
const API_BASE_URL = 'http://10.0.2.2:7000';

// API token - replace with your actual token
// You can also load this from environment variables or a secure storage
const API_TOKEN = 'Bearer QlVfQUxWSU5BX05PXzE='; // Replace this with your actual token

// Create axios instance with authentication
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`, // Add the token in the Authorization header
  },
  timeout: 10000, // 10 seconds
});

// Define interfaces for API data
export interface VaccineData {
  _id: string;
  name: string;
  manufacturer: string;
  type: string;
  dosage: number;
  effectiveness: number;
  sideEffects?: string[];
  approvalDate: string;
  description?: string;
  // UI-related fields
  location?: string;
  distance?: string;
  price?: string;
  image?: any;
}

// Better error handling helper
const handleApiError = (error: any, message: string) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      // Server responded with a status code outside the 2xx range
      console.error(`${message} - Status: ${axiosError.response.status}`);
      if (axiosError.response.status === 401) {
        console.error('Authentication failed. Please check your API token.');
      }
      console.error('Response data:', axiosError.response.data);
    } else if (axiosError.request) {
      // No response was received
      console.error(`${message} - No response received. Is the server running?`);
    } else {
      // Something happened in setting up the request
      console.error(`${message} - Error setting up request:`, axiosError.message);
    }
  } else {
    // Non-axios error
    console.error(`${message}:`, error);
  }
  throw error;
};

// API service
export const vaccineApi = {
  // Set or update the API token
  setToken: (token: string) => {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  // Get all vaccines
  getVaccines: async (): Promise<VaccineData[]> => {
    try {
      const response = await apiClient.get('wiki/vaccine');
      return response.data;
    } catch (error) {
      handleApiError(error, 'Error fetching vaccines');
      throw error;
    }
  },

  // Get vaccine by ID
  getVaccineById: async (id: string): Promise<VaccineData> => {
    try {
      const response = await apiClient.get(`/vaccine/${id}`);
      return response.data;
    } catch (error) {
      handleApiError(error, `Error fetching vaccine with ID ${id}`);
      throw error;
    }
  },
};