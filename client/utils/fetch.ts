// TODO: 時間があればenvに分ける
const API_URL = "http://localhost:8000/";

export const fetcher = async (url: string, method: string, body?: any) => {
    const res = await fetch(`${API_URL}${url}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error("An error occurred while fetching the data.");
    }

    return res.json();
};
