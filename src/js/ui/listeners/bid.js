import { authFetch } from "../../api/authFetch.js";
import { baseURL, setAmount } from "../../api/constants.js";

export async function bid(event) {
  event.preventDefault();
  try {
    let id = event.target.dataset.id;

    const idEndpointBid = `auction/listings/${id}/bids`;

    const amountInput = parseFloat(setAmount.value);
    console.log(amountInput);

    const amountData = {
      amount: amountInput,
    };

    const response = await authFetch(baseURL + idEndpointBid, {
      method: "POST",
      body: JSON.stringify(amountData),
    });
    const json = await response.json();
    console.log(response);
    if (!response.ok) {
      throw new Error(json.errors?.[0]?.message || "Bid failed");
    } else
      document.getElementById("successContainer").innerText =
        "Bid was successful. If you win, you will get notified by email, and we will present you with shipping options.";
  } catch (error) {
    document.getElementById("errorContainer").innerText = "Error: " + error;
  }
  return await json;
}
