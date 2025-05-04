const API_URL = "http://localhost:8000/";

export const fetcher = async (url: string, method: string, body?: any) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body && method !== "GET") {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${url}`, options);

  if (!res.ok) {
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
};
