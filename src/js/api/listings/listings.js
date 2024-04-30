import * as consts from "../constants.js";

export async function fetchListings() {
  const response = await fetch(consts.baseURL + consts.listingsEndpoint);

  const json = await response.json();

  console.log(json);

  consts.displayListings.innerHTML = "";
  const listings = json;
  return listings;
}

fetchListings();
