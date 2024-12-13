import { authFetch } from "../authFetch.js";
import { baseURL, registerEndpoint } from "../constants.js";

function clearLocalStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("loginStatus");
  localStorage.removeItem("userProfile");
}

export async function register(user) {
  clearLocalStorage();

  const response = await authFetch(baseURL + registerEndpoint, {
    method: "POST",
    body: JSON.stringify(user),
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }

  return json;
}
