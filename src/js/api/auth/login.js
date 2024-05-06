import { apiKey, baseURL, loginEndpoint } from "../constants.js";

export async function login(url, data) {
  const loginData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": apiKey,
    },
    body: JSON.stringify(data),
  };
  const response = await fetch(baseURL + loginEndpoint, loginData);

  const json = await response.json();
  console.log(response);
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Login failed");
  }

  return await json;
}
