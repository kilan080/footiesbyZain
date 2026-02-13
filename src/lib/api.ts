const BASE_URL = "https://footies-backend.vercel.app";

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("adminToken");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });

  // If token expired or invalid
  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  }

  if (!response.ok) {
    const text = await response.text();
    console.error(`API Error [${response.status}]:`, text);
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};
