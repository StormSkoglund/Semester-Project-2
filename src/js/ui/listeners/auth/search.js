import { authFetch } from "../../../api/authFetch.js";
import { baseURL, searchInput, startSearch } from "../../../api/constants.js";
import { singleListing } from "../../../api/listings/singleListing.js";

startSearch.addEventListener("click", function (event) {
  event.preventDefault();
  search(event);
});

async function search(event) {
  event.preventDefault();

  const getSearchInputs = searchInput.value.trim().toLowerCase();
  console.log(getSearchInputs);

  const searchValueEndpoint = "auction/listings/search?q=" + getSearchInputs;

  const response = await authFetch(baseURL + searchValueEndpoint, {
    method: "GET",
  });
  const json = await response.json();
  console.log(response);
  if (!response.ok) {
    document.getElementById("searchErrorContainer").innerText = "Search failed";
  } else if (json.data.length === 0) {
    document.getElementById("searchErrorContainer").innerText =
      "No search results";
  } else {
    let searchContainer = document.getElementById("searchContainer");
    searchContainer.innerHTML = "";
    json.data.forEach((item) => {
      let mediaContent = item.media[0]
        ? item.media[0].url
        : "https://picsum.photos/id/26/800/500";
      let altText = item.media[0]
        ? item.media[0].alt
        : "A selection of expensive items";

      let htmlContent = `<div class="my-border-thin p-3">
        <div class="header3 col-10 text-truncate mt-3 mb-3">${item.title}</div>
        <div class="p-large fw-bold col-12 mt-3 mb-3">${item.description}</div>
        <img class="mx-2 mb-5 h-auto col-6 m-auto d-block listing-img-search" src="${mediaContent}" alt="${altText}" />
        <div class="d-flex justify-content-end "><p class="p-large">Number of bids: ${item._count.bids}</p></div>
        
        <div class="d-flex justify-content-end"><button class="btn blue-btn text-center bid-btn" data-bs-toggle="modal"
        data-bs-target="#singleListingModal" data-user-id="${item.id}">View Details</button></div>
        </div>
        `;

      searchContainer.insertAdjacentHTML("beforeend", htmlContent);
    });

    let buttons = document.querySelectorAll(".bid-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", singleListing);
    });
  }

  return await json;
}
