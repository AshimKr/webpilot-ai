const API_URL = "http://localhost:5000/api/ai";

export const sendAIRequest = async (request) => {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(request)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "AI request failed.");
  }

  return data;
};