import { tryCatchError } from "../../tools/tryCatchError.js";
import { authFetch } from "../authFetch.js";
import { baseURL, profileEndpoint } from "../constants.js";

export async function getProfile() {
  try {
    const response = await authFetch(baseURL + profileEndpoint, {
      method: "GET",
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(
        (document.getElementById.innerText =
          json.errors?.[0]?.message || "Could not fetch profile information")
      );
    } else document.getElementById("profileContainer").innerHTML = "";
    return await json;
  } catch (error) {
    tryCatchError(error);
  }
}
