import { getProfile } from "./getProfile.js";

export async function renderProfile() {
  const profileContent = await getProfile();

  console.log(profileContent);

  document.getElementById(
    "profileBidInfo"
  ).innerHTML += `<p class="p-large fs-2 fw-bold m-3">Your Auction Bids</p> <p class="p-small m-3"> Number on listings belonging to ${profileContent.data.name}: ${profileContent.data._count.listings}</div> <p class="p-small m-3"> Number on wins by ${profileContent.data.name}: ${profileContent.data._count.wins}</div>`;

  if (profileContent.data.listings.length > 0) {
    document.getElementById(
      "listingDetails"
    ).innerHTML = `<p class="p-large fw-bold fs-2>Your Auction Inventory</p><p class="p-small fs-3 >${profileContent.data.listings.title}</p>`;
    const mediaItems = profileContent.data.listings.media.url;
    mediaItems.forEach((mediaItem) => {
      document.getElementById(
        "listingDetails"
      ).innerHTML += `<img class="listing-img" scr"${mediaItem}>" `;
    });
  }
  document.getElementById("creditsContainer").innerHTML = `
  <div class="header4 m-2 col-6 text-center m-auto">Your Wallet</div>
  <div class="bg-primary my-border-thin p-3 mb-5 mt-2 row col-12 col-md-10 m-auto d-block-inline">
    <h5 class="text-light col-12 col-md-6 m-auto text-center mb-2">Sell items to gain more credit</h5>
    <div class="float-end">
      <p class="bg-light p-large col-12 col-md-4 m-auto p-3 my-border-thin text-center">${profileContent.data.credits} Credit \uD83D\uDC5B&#xFE0E</p>
    </div>
  </div>
`;
}
