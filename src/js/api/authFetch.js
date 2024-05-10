import { headers } from "./headers.js";

//This code is from Olivers tutorial on API keys, where he also demonstrate a proper way of refactoring code. From the video "Noroff API V2 - Using JWT and API Keys" (Viewed on May 05. 2024).

export async function authFetch(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: headers(Boolean(options.body)),
  });
}
