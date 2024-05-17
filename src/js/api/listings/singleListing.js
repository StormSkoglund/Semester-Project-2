import { bid } from "../../ui/listeners/bid.js";
import { authFetch } from "../authFetch.js";
import { baseURL } from "../constants.js";
import { renderListings } from "./renderListings.js";

export async function singleListing(event) {
  try {
    document.getElementById("itemGallery").innerHTML = "";
    const listingId = event.target.dataset.userId;
    const listing = await renderListings();
    console.log(listing);
    const singleListingEndpoint =
      "auction/listings/" + listingId + "?_seller=true&_bids=true";
    const response = await authFetch(baseURL + singleListingEndpoint, {
      method: "GET",
    });
    if (response.ok) {
      console.log(response);
      const displayListData = await response.json();
      console.log(displayListData);
      const listingId = event.target.dataset.userId;
      let bidButton = document.getElementById("modalSubmitButton");

      document.getElementById("modalTitle").innerText =
        "Item On Sale:  " + displayListData.data.title;
      document.getElementById("modalDescription").innerText =
        "Description: " + displayListData.data.description;
      document.getElementById("modalBidAmount").innerText =
        " Number of bids: " + displayListData.data._count.bids;
      bidButton.setAttribute("data-id", listingId);

      bidButton.addEventListener("click", bid);

      let bids = displayListData.data.bids;

      if (bids.length > 0) {
        let highestBid = bids.reduce(
          (max, bid) => (bid.amount > max ? bid.amount : max),
          bids[0].amount
        );

        document.getElementById("amountContainer").innerText =
          "The highest bid is: " + highestBid + " credits";
      } else {
        console.log("No bids available");
      }

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
        document.getElementById("errorContainer").innerText =
          "No images available";
      }
    } else {
      document.getElementById("errorContainer").innerText =
        "No images available";
    }
  } catch (error) {
    document.getElementById("errorContainer").innerText = "Error: " + error;
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  let buttons = document.querySelectorAll(".bid-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", singleListing);
  });
});
