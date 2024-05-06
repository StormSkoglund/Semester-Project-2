//*import { baseURL, keyEndpoint } from "../constants.js";

//The following code only needs to run once, but I keep it here, for the sake of reusability.
// Olivers tutorial on API keys, from the video Noroff API V2 - Using JWT and API Keys (Viewed on May 05. 2024)
/*export async function getAPIKey() {
  const token = localStorage.getItem("accesToken");
  console.log(token);
  const response = await fetch(baseURL + keyEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log(response);
  if (response.ok) {
    const data = await response.json();
    console.log(data);
  }

  console.error();

  throw new Error("Could not register for an API key!");
}
*/
