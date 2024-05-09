import { baseURL, listingsEndpoint } from "../constants.js";
import { fetchListings } from "./fetchListings.js";

export async function carouselListings() {
  try {
    const trendingItems = await fetchListings(baseURL + listingsEndpoint);

    console.log(trendingItems);

    // Items with the most bids
    trendingItems.data
      .sort((a, b) => b.bids.length - a.bids.length)
      .forEach((trendingItem) => {
        let item1 = trendingItems.data[0];
        let item2 = trendingItems.data[1];
        let item3 = trendingItems.data[2];

        console.log(item1, item2, item3);

        let mediaContent1 =
          item1.media && item1.media[0]
            ? item1.media[0].url
            : "https://picsum.photos/id/26/800/500";
        let altText1 =
          item1.media && item1.media[0]
            ? item1.media[0].alt
            : "A selection of expensive items";

        let mediaContent2 =
          item2.media && item2.media[1]
            ? item2.media[1].url
            : "https://picsum.photos/id/26/800/500";
        let altText2 =
          item2.media && item2.media[1]
            ? item2.media[1].alt
            : "A selection of expensive items";

        let mediaContent3 =
          item3.media && item3.media[2]
            ? item3.media[2].url
            : "https://picsum.photos/id/26/800/500";
        let altText3 =
          item3.media && item3.media[2]
            ? item3.media[2].alt
            : "A selection of expensive items";

        document.getElementById("carousel").innerHTML += "";
        document.getElementById("carousel").innerHTML += `
        <div id="carouselItems" class="carousel slide">
          <div class="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselItems"
              data-bs-slide-to="0"
              class="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselItems"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselItems"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${mediaContent1}" class="d-block m-auto w-100 img-carousel" alt="${altText1}" />
            <div class="carousel-caption d-md-block">
              <p class="header1 col-6 text-truncate mt-3 mb-3 m-auto">
                ${item1.title[0]}.
              </p>
            </div>
          </div>
          <div class="carousel-item active">
            <img src="${mediaContent2}" class="d-block m-auto w-100 img-carousel" alt="${altText2}" />
            <div class="carousel-caption d-md-block">
              <p class="header1 col-6 text-truncate mt-3 mb-3 m-auto">
                ${item2.title[1]}.
              </p>
            </div>
          </div>
          <div class="carousel-item active">
            <img src="${mediaContent3}" class="d-block m-auto w-100 img-carousel" alt="${altText3}" />
            <div class="carousel-caption d-md-block">
              <p class="header1 col-6 text-truncate mt-3 mb-3 m-auto">
                ${item3.title[2]}.
              </p>
            </div>
          </div>

          <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselItems"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselItems"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>`;
      });
  } catch (error) {
    console.error("Error in carouselListings: ", error);
  }
}
