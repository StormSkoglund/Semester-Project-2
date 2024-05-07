import { load } from "../storage/load.js";
import { apiKey } from "./constants.js";

//This code is from Olivers tutorial on API keys, where he also demonstrate a proper way of refactoring code. From the video "Noroff API V2 - Using JWT and API Keys" (Viewed on May 05. 2024).

export function headers(hasBody = false) {
  const headers = new Headers();

  const token = load("token");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (apiKey) {
    headers.append("X-Noroff-API-Key", apiKey);
  }

  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }

  return headers;
}
