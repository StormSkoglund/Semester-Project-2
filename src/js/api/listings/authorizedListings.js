import { load } from "../../storage/load";

export async function authorizedListings() {
  try {
    let userProfile = load("userProfile");
    let email = userProfile.email;
    const listings = await fetchListings();
    if (email) {
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

          let htmlContent = `
      <div class="header3 col-5 text-truncate mt-3 mb-3">${listing.title}</div>
      <img class="mx-2 mb-5 align-self-start h-auto listing-img" src="${mediaContent}" alt="${altText}" /> 
      <div class="d-flex justify-content-end "><p class="p-large">Number of bids: ${listing._count.bids}</p></div>
      <div class="d-flex justify-content-end"><button class="btn blue-btn opacity-50 text-center">Bid Now</button></div>
      <div class="d-flex justify-content-end"><p class="p-small col-5 m-auto mb-3 pt-3 text-center">Login or register to place a bid.</p></div>
`;

          listingContainer.insertAdjacentHTML("beforeend", htmlContent);

          let countdownContainer = document.createElement("div");
          listingContainer.appendChild(countdownContainer);

          // Start countdown
          renderCountdown(auctionEnd, countdownContainer);
          displayListings.appendChild(listingContainer);
        });
      } catch (error) {
        displayListings.innerHTML += `${error}`;
      }
    }
  } catch (error) {}
}
