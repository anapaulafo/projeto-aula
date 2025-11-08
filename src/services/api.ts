const API_URL = "http://localhost:4000/api";

export async function apiRequest(path: string, method = "GET", body?: any) {
  const token = localStorage.getItem("token");
  const headers: any = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
}
