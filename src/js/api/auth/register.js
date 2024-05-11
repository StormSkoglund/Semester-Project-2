import { authFetch } from "../authFetch.js";
import { baseURL, registerEndpoint } from "../constants.js";

export async function register(user) {
  const response = await authFetch(baseURL + registerEndpoint, {
    method: "POST",
    body: JSON.stringify(user),
  });
  const json = await response.json();
  console.log(response);
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }

  return await json;
}
