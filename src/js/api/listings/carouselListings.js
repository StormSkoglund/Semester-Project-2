import { baseURL, listingsEndpoint } from "../constants.js";
import { fetchListings } from "./fetchListings.js";

export async function carouselListings() {
  try {
    const trendingItems = await fetchListings(baseURL + listingsEndpoint);

    let carouselItems = "";

    // Items with the most bids, with only three items showing in carousel at a time.
    trendingItems.data
      .sort((a, b) => b.bids.length - a.bids.length)
      .slice(0, 3)
      .forEach((trendingItem, index) => {
        let item = trendingItems.data[index];
        // default imagery and alternate text, in case of missing data in fetched items. Demonstrated by Martin Krüger in a live session during the JS2 CA.
        let mediaContent =
          item.media && item.media[index]
            ? item.media[index].url
            : "https://picsum.photos/id/26/800/500";
        let altText =
          item.media && item.media[index]
            ? item.media[index].alt
            : "A selection of expensive items";

        carouselItems += `
            <div class="carousel-item ${index === 0 ? "active" : ""}">
              <img src="${mediaContent}" class="d-block m-auto img-fluid img-carousel" alt="${altText}" />
              <div class="carousel-caption d-md-block">
                <p class="col-12 text-truncate mt-3 mb-3 m-auto bg-dark rounded opacity-75 text-small text-md-header1">
              ${item.title}
              </p>

              </div>
            </div>`;
      });

    document.getElementById("carousel").innerHTML = `
          <div id="carouselItems" class="carousel slide">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselItems" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselItems" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselItems" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              ${carouselItems}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselItems" data-bs-slide="prev">
              <span class="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselItems" data-bs-slide="next">
              <span class="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>`;
  } catch (error) {
    console.error("Error in carouselListings: ", error);
  }
}
