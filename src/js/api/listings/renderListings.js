import { load } from "../../storage/load.js";
import { renderCountdown } from "../../tools/renderCountdown.js";
import { baseURL, displayListings, listingsEndpoint } from "../constants.js";
import { fetchListings } from "./fetchListings.js";
import { singleListing } from "./singleListing.js";

export async function renderListings() {
  try {
    const listings = await fetchListings(baseURL + listingsEndpoint);

    listings.data.forEach((listing) => {
      let mediaContent = listing.media[0]
        ? listing.media[0].url
        : "https://picsum.photos/id/26/800/500";
      let altText = listing.media[0]
        ? listing.media[0].alt
        : "A selection of expensive items";

      let listingAuctionEnd = new Date(`${listing.endsAt}`);
      let now = new Date();

      let listingContainer = document.createElement("div");

      let htmlContent = `
      <div class="col-5 text-truncate mt-3 mb-3 fs-5 header1 fs-md-1">${listing.title}</div>
      <img class="mx-2 mb-5 align-self-start h-auto listing-img" src="${mediaContent}" alt="${altText}" /> 
      <div class="d-flex justify-content-end "><p class="p-large">Number of bids: ${listing._count.bids}</p></div>
      <div class="d-flex justify-content-end "><p class="p-large me-2">Seller: </p><p class="p-large text-warning">${listing.seller.name}</p></div>`;

      if (now > listingAuctionEnd) {
        htmlContent += `<div class="d-flex justify-content-end"><button class="btn blue-btn opacity-50 text-center bid-btn" "${listing.id}">Auction has ended</button></div>`;
      } else {
        htmlContent += `<div class="d-flex justify-content-end"><button class="btn blue-btn text-center bid-btn" data-bs-toggle="modal"
          data-bs-target="#singleListingModal" data-user-id="${listing.id}">View Details</button></div>`;
      }

      listingContainer.innerHTML = "";
      listingContainer.insertAdjacentHTML("beforeend", htmlContent);

      if (now <= listingAuctionEnd) {
        listingContainer
          .querySelector(".bid-btn")
          .addEventListener("click", singleListing);
      }

      let countdownContainer = document.createElement("div");
      listingContainer.appendChild(countdownContainer);

      // Start countdown
      renderCountdown(listingAuctionEnd, countdownContainer);
      displayListings.appendChild(listingContainer);
    });
  } catch (error) {
    console.error("Error in renderListings: ", error);
    if (displayListings) {
      displayListings.innerHTML += `Error: ${error.message}`;
    }
  }
}
