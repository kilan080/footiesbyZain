const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchWithAuth = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("adminToken");
  // const url = `${BASE_URL}${endpoint}`;
  // console.log(" Fetching URL:", url);

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
