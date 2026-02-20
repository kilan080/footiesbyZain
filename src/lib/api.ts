const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = async (
  endpoint: string,
  // eslint-disable-next-line
  options: any = {}
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
  const data = await response.json();
  return data;
};
