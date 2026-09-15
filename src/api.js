export const API_BASE =
  import.meta.env.VITE_API_URL || "https://triobyte-portal.onrender.com";

export const getToken = () =>
  localStorage.getItem("tb_token");

export const setToken = (token) =>
  localStorage.setItem("tb_token", token);

export const clearToken = () =>
  localStorage.removeItem("tb_token");

export async function api(path, options = {}) {
  const token = getToken();
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  let response;

  try {
    const headers = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    };

    // Let the browser set the multipart boundary for FormData.
    if (!isFormData) {
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
    }

    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
      body:
        options.body &&
        typeof options.body !== "string" &&
        !isFormData
          ? JSON.stringify(options.body)
          : options.body,
    });
  } catch {
    throw new Error(
      "Cannot connect to the backend. Check that the published backend is available."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      `Request failed (${response.status})`
    );
  }

  return data;
}
