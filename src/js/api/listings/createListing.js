import { authFetch } from "../authFetch.js";
import {
  baseURL,
  itemDescription,
  itemTitle,
  listingsEndpointCreate,
  url1,
  url2,
  url3,
  url4,
} from "../constants.js";

let selectedDeadline;

const deadlineOptions = document.getElementById("auctionDeadline");

selectedDeadline = deadlineOptions.options[deadlineOptions.selectedIndex].value;

deadlineOptions.addEventListener("change", function () {
  selectedDeadline = this.options[this.selectedIndex].value;
  console.log(selectedDeadline);
});

document
  .getElementById("createListingForm")
  .addEventListener("submit", createListing);

export async function createListing(event) {
  event.preventDefault();
  try {
    const titleInput = itemTitle.value;
    const descriptionInput = itemDescription.value;
    const imageInput1 = url1.value || "https://picsum.photos/id/26/2000/3000";
    const imageInput2 = url2.value || "https://picsum.photos/id/26/2000/3000";
    const imageInput3 = url3.value || "https://picsum.photos/id/26/2000/3000";
    const imageInput4 = url4.value || "https://picsum.photos/id/26/2000/3000";

    // Date Class available at https://mollify.noroff.dev/content/feu1/javascript-1/module-6/lesson-2/date?#formatting-dates "Noroff" (2024) ‘JavaScript 1: Module 6: Lesson 2: Date’, Available at: (Accessed: 12 May 2024).
    var now = new Date();
    now.setHours(now.getHours() + Number(selectedDeadline));
    var realDeadline = now.toISOString();
    console.log(realDeadline, now);

    const listingData = {
      title: `${titleInput}`,
      description: `${descriptionInput}`,
      media: [
        {
          url: `${imageInput1}`,
          alt: `${descriptionInput}`,
        },
        {
          url: `${imageInput2}`,
          alt: `${descriptionInput}`,
        },
        {
          url: `${imageInput3}`,
          alt: `${descriptionInput}`,
        },
        {
          url: `${imageInput4}`,
          alt: `${descriptionInput}`,
        },
      ],
      endsAt: `${realDeadline}`,
    };

    const response = await authFetch(baseURL + listingsEndpointCreate, {
      method: "POST",
      body: JSON.stringify(listingData),
    });
    const json = await response.json();
    console.log(response);
    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Could not create listing");
    } else
      document.getElementById("listingSaved").innerText = "Listing created";

    return await json;
  } catch (error) {
    document.getElementById(
      "listingDenied"
    ).innerText = `Listing created, could not create listing: ${error}`;
  }
}
