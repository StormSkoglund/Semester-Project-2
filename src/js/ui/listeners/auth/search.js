import { authFetch } from "../../../api/authFetch.js";
import { baseURL, searchInput, startSearch } from "../../../api/constants.js";

startSearch.addEventListener("submit", search);

async function search(event) {
  event.preventDefault();

  const getSearchInputs = searchInput.value;
  console.log(searchInput);

  const searchValueEndpoint = "auction/listings/search?q=" + searchInput;

  const response = await authFetch(baseURL + searchValueEndpoint, {
    method: "GET",
    body: JSON.stringify(getSearchInputs),
  });
  const json = await response.json();
  console.log(response);
  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "Search failed");
  } else alert(response);

  return await json;
}
