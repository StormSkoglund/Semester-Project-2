import { authFetch } from "../authFetch.js";
import { baseURL } from "../constants.js";
import { renderListings } from "./renderListings.js";

export async function singleListing(event) {
  document.getElementById("itemGallery").innerHTML = "";
  const listingId = event.target.dataset.userId;
  const listing = await renderListings();
  console.log(listing);
  const singleListingEndpoint = "auction/listings/" + listingId;
  const response = await authFetch(baseURL + singleListingEndpoint, {
    method: "GET",
  });
  if (response.ok) {
    console.log(response);
    const displayListData = await response.json();
    console.log(displayListData);

    document.getElementById("modalTitle").innerText =
      "Item On Sale:  " + displayListData.data.title;
    document.getElementById("modalDescription").innerText =
      "Description:" + displayListData.data.description;
    if (displayListData.data.media.length > 0) {
      displayListData.data.media.forEach((mediaItem) => {
        let imgElement = document.createElement("img");
        imgElement.src = mediaItem.url;
        imgElement.alt = mediaItem.alt;
        imgElement.className =
          "d-block col-4 m-auto ms-3 me-3 m bid-img rounded-2";
        document.getElementById("itemGallery").appendChild(imgElement);
      });
    } else {
      console.error("No images available");
    }
  } else {
    console.error("Failed to fetch listing details");
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  let buttons = document.querySelectorAll(".bid-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", singleListing);
  });
});
