import { baseURL, registerEndpoint } from "../constants.js";

export async function register(user) {
  const response = await fetch(baseURL + registerEndpoint, {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  console.log(response);
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Registration failed");
  }

  return await json;
}
