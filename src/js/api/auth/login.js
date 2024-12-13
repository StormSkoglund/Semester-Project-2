import { authFetch } from "../authFetch.js";
import { baseURL, loginEndpoint } from "../constants.js";

export async function login(url, data) {
  const loginData = {
    method: "POST",
    body: JSON.stringify(data),
  };
  const response = await authFetch(baseURL + loginEndpoint, loginData);

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  return await json;
}
