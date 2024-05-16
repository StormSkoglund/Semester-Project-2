import { authFetch } from "../../../api/authFetch.js";
import { baseURL, searchInput, startSearch } from "../../../api/constants.js";

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
    throw new Error(json.errors?.[0]?.message || "Search failed");
  } else {
    let searchContainer = document.getElementById("searchContainer");
    json.data.forEach((item) => {
      let mediaContent = item.media[0]
        ? item.media[0].url
        : "https://picsum.photos/id/26/800/500";
      let altText = item.media[0]
        ? item.media[0].alt
        : "A selection of expensive items";

      let sellerName = item.seller ? item.seller.name : "Unknown";
      let htmlContent = `<div class="my-border-thin p-3">
        <div class="header3 col-5 text-truncate mt-3 mb-3">${item.title}</div>
        <img class="mx-2 mb-5 align-self-start h-auto listing-img" src="${mediaContent}" alt="${altText}" />
        <div class="d-flex justify-content-end "><p class="p-large">Number of bids: ${item._count.bids}</p></div>
        <div class="d-flex justify-content-end "><p class="p-large me-2">Seller: </p><p class="p-large text-warning">${sellerName}</p></div>
        </div>
        `;
      searchContainer.innerHTML = "";
      searchContainer.insertAdjacentHTML("beforeend", htmlContent);
    });
  }

  return await json;
}
