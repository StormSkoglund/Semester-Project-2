import { renderCountdown } from "../../tools/renderCountdown.js";
import { displayListings } from "../constants.js";
import { getProfile } from "./getProfile.js";

export async function renderProfile() {
  try {
    const profileContent = await getProfile();

    console.log(profileContent);

    document.getElementById(
      "profileBidInfo"
    ).innerHTML = `<p class="p-large fs-2 fw-bold mb-1">Your Auction Bids</p>  <p class="p-small m-3"> Number of auctions won by ${profileContent.data.name}: ${profileContent.data._count.wins}</p>`;

    if (profileContent.data.listings.length > 0) {
      profileContent.data.listings.forEach((listing) => {
        let listingAuctionEnd = `${listing.endsAt}`;

        document.getElementById(
          "listingDetails"
        ).innerHTML = `<p class="p-large fs-2 fw-bold mb-1">Your Auction Inventory</p><p class="p-large fs-3" >${listing.title}</p>`;

        let countdownContainer = document.createElement("div");
        let listingContainer = document.createElement("div");
        listingContainer.appendChild(countdownContainer);

        renderCountdown(listingAuctionEnd, countdownContainer);
        displayListings.appendChild(listingContainer);
        if (!displayListings) {
          displayListings.innerHTML += `Error: ${error.message}`;
        }

        listing.media.forEach((mediaItem) => {
          document.getElementById(
            "listingMedia"
          ).innerHTML += `<img class="img-fluid col-4 p-1 pro-list-img m-auto" src="${mediaItem.url}" alt="${mediaItem.alt}">`;
        });
      });
    }
    document.getElementById("creditsContainer").innerHTML = `
  <div class="header4 m-2 col-6 text-center m-auto">Your Wallet</div>
  <div class="bg-primary my-border-thin p-3 mb-5 mt-2 row col-12 col-md-10 m-auto d-block-inline">
    <h5 class="text-light col-12 col-md-6 m-auto text-center mb-2">Sell items to gain more credit</h5>
    <div class="float-end">
      <p class="bg-light p-large col-12 col-md-4 m-auto p-3 my-border-thin text-center">${profileContent.data.credits} Credits \uD83D\uDC5B&#xFE0E</p>
    </div>
  </div>
`;
  } catch (error) {
    console.error("Error in the profile rendering: ", error);
  }
}
