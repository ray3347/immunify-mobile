// src/services/HTTPService.ts

const BASE_URL = "http://192.168.1.10:7000";
const BEARER_TOKEN = "Bearer QlVfQUxWSU5BX05PXzE=";

export const HTTPService = {
  async get(path: string) {
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to fetch");
      }

      return await response.json();
    } catch (error) {
      console.error(`GET ${path} error:`, error);
      throw error;
    }
  },

  // Add other methods like POST, PUT, DELETE if needed later
};
