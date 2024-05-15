import { renderCountdown } from "../../tools/renderCountdown.js";
import { displayListings } from "../constants.js";
import { getProfile } from "./getProfile.js";

export async function renderProfile() {
  try {
    const profileContent = await getProfile();

    console.log(profileContent);
    document.getElementById(
      "profileContainer"
    ).innerHTML += `<p class="header2 text-center">${profileContent.data.name}</p><img class="d-block col-4 m-auto pro-list-img rounded-circle" src="${profileContent.data.avatar.url}" alt="${profileContent.data.avatar.alt}">`;

    document.getElementById(
      "profileBidInfo"
    ).innerHTML = `<p class="p-large fs-2 fw-bold mb-1">Your Auction Bids</p> <p class="p-small text-center"> Number of auctions won by ${profileContent.data.name}: ${profileContent.data._count.wins}</p>
    <p class="p-large fs-2 fw-bold mt-1">Your Auction Inventory</p>`;

    if (profileContent.data.listings.length > 0) {
      profileContent.data.listings.forEach((listing, index) => {
        let listingAuctionEnd = `${listing.endsAt}`;

        let titleElement = document.createElement("p");
        titleElement.className = "p-large fw-bold fs-4 mt-3";
        titleElement.textContent = ` ${listing.title}`;
        document.getElementById("listingDetails").appendChild(titleElement);

        let listingContainer = document.createElement("div");
        listingContainer.id = `listingContainer${index}`;
        displayListings.appendChild(listingContainer);

        let countdownContainer = document.createElement("div");
        countdownContainer.id = `countdown${index}`;
        document
          .getElementById(`listingContainer${index}`)
          .appendChild(countdownContainer);

        renderCountdown(listingAuctionEnd, countdownContainer);

        const galleryContainer = document.createElement("div");
        galleryContainer.id = `listing${index}`;
        document
          .getElementById(`listingContainer${index}`)
          .appendChild(galleryContainer);

        listing.media.forEach((mediaItem) => {
          let imgElement = document.createElement("img");
          imgElement.src = mediaItem.url;
          imgElement.className = "pro-list-img m-3 rounded-1";
          imgElement.alt = mediaItem.alt;
          document.getElementById(`listing${index}`).appendChild(imgElement);
        });
      });
    }
    document.getElementById("creditsContainer").innerHTML = `
  <div class="header4 m-2 col-6 text-center m-auto">Your Wallet</div>
  <div class="bg-primary my-border-thin p-3 mb-5 mt-2 row col-12 col-md-10 m-auto d-block-inline">
    <h5 class="text-light col-12 col-md-6 m-auto text-center mb-2">Sell items to gain more credit</h5>
    <div class="float-end">
      <p class="bg-light p-large col-12 col-md-4 m-auto p-3 my-border-thin text-center">${profileContent.data.credits} Credits \uD83D\uDC5B︎</p>
    </div>
  </div>
`;
  } catch (error) {
    console.error("Error in the profile rendering: ", error);
  }
}
