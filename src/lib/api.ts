const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = async (
  endpoint: string,
  // eslint-disable-next-line
  options: any = {},
  isPublic: boolean = false  // ← new param, defaults to false
) => {
  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("token");

  // Pick the right token — admin for admin routes, user for others
  const token = endpoint.startsWith("/admin") ? adminToken : userToken;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(!isPublic && token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  // Only redirect on 401 for protected routes
  if (response.status === 401 && !isPublic) {
    if (endpoint.startsWith("/admin")) {
      localStorage.removeItem("adminToken");
      window.location.href = "/admin-login";
    } else {
      localStorage.removeItem("token");
      window.location.href = "/user-login";
    }
  }

  if (!response.ok) {
    const text = await response.text();
    console.error(`API Error [${response.status}]:`, text);
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  return data;
};