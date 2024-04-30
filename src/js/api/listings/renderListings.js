import { renderCountdown } from "../../tools.js";
import { displayListings } from "../constants.js";
import { fetchListings } from "./listings.js";

export async function renderListings(auctionEnd, renderContainer) {
  const listings = await fetchListings();
  console.log(listings);

  try {
    listings.data.forEach((listing) => {
      let mediaContent = listing.media[0]
        ? listing.media[0].url
        : "https://picsum.photos/id/26/800/500";
      let altText = listing.media[0]
        ? listing.media[0].alt
        : "A selection of expensive items";

      const renderContainer = displayListings;
      const auctionEnd = `${listing.endsAt}`;
      let listingContainer = document.createElement("div");

      listingContainer.innerHTML += `
      <div class="header3 col-4 text-truncate mt-3 mb-3">${listing.title}</div>
      <img class="card col-4 col-sm-3 img-thumnail mx-2 mb-5 p-5 align-self-start h-auto" src=${mediaContent} alt="${altText}" /> 
      <div class="d-flex justify-content-end "><p class="p-large">Number of bids: ${listing._count.bids}</p></div>
      <div class="d-flex justify-content-end"><button class="btn blue-btn opacity-50 text-center">Bid Now</button></div>
      <div class="d-flex justify-content-end"><p class="p-small col-5 m-auto mb-3 pt-3 text-center">Login or register to place a bid.</p></div>
      
    `;
      let countdownContainer = document.createElement("div");
      listingContainer.appendChild(countdownContainer);

      // Start the countdown for this listing
      renderCountdown(auctionEnd, countdownContainer);

      // Append the listing container to the main display
      displayListings.appendChild(listingContainer);
    });
  } catch (error) {
    displayListings.innerHTML += `${error}`;
  }
}
