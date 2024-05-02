import { baseURL, registerEndpoint } from "../constants.js";

export async function registerUser(user) {
  const response = await fetch(baseURL + registerEndpoint, {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const json = await response.json();

  return await json;
}
