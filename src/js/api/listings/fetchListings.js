import * as consts from "../constants.js";

export async function fetchListings(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const json = await response.json();
    if (consts.displayListings) {
      consts.displayListings.innerHTML = "";
    } else {
      console.error("displayListings not found");
    }
    const listings = json;
    return listings;
  } catch (error) {
    console.error("Couldn't fetch ", error);
  }
}
