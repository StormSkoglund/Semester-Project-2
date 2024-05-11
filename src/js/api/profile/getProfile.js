import { authFetch } from "../authFetch.js";
import { baseURL, profileEndpoint } from "../constants.js";

export async function getProfile() {
  const response = await authFetch(baseURL + profileEndpoint, {
    method: "GET",
  });
  const json = await response.json();
  console.log(response);
  if (!response.ok) {
    throw new Error(
      json.errors?.[0]?.message || "Failed while fetching profile information"
    );
  }

  return await json;
}
