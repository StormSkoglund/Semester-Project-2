import { baseURL, registerEndpoint } from "../constants";

export async function registerUser(username, email, password, avatar) {
  const response = await fetch(baseURL + registerEndpoint, {
    method: "post",
    body: JSON.stringify({ username, email, password, avatar }),
    headers: headers("application/json"),
  });
  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
