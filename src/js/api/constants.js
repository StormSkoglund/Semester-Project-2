import { load } from "../storage/load.js";

// Inputs
export const password = document.getElementById("password");
export const confirmPassword = document.getElementById("confirmPassword");
export const showError = document.querySelector(".errorContainer");
export const username = document.getElementById("username");
export const email = document.getElementById("email");
export const avatar = document.getElementById("avatar");
export const avatarAlt = document.getElementById("avatarAlt");
export const passwordLogin = document.getElementById("passwordInput");
export const emailLogin = document.getElementById("emailInput");
export const itemTitle = document.getElementById("itemTitle");
export const itemDescription = document.getElementById("itemDescription");
export const url1 = document.getElementById("url1");
export const url2 = document.getElementById("url2");
export const url3 = document.getElementById("url3");
export const url4 = document.getElementById("url4");
export const setAmount = document.getElementById("bidAmount");
export const searchInput = document.getElementById("search");
export const startSearch = document.getElementById("searchButton");
// Containers
export const showTryCatchError = document.querySelector(".tryCatchContainer");
export const successContainer = document.querySelector(".successContainer");
export const displayListings = document.querySelector(".listingsContainer");
// Others
export const apiKey = "0c56abcc-f1d7-4dc9-8fad-82ea23932992";
export const userProfile = load("userProfile");
export const userName = userProfile?.username;
export const isLoggedIn = load("loginStatus");

// URL
export const baseURL = "https://v2.api.noroff.dev/";
export const registerEndpoint = "auth/register";
export const listingsEndpoint =
  "auction/listings?_seller=true&_bids=true&sortOrder=desc";
//export const listingsEndpointFiltered = "auction/listings?_tag=&_active=true";
export const loginEndpoint = "auth/login";
export const keyEndpoint = "auth/create-api-key";
export const profileEndpoint = `auction/profiles/${userName}?_listings=true&_wins=true`;
export const profileEndpointRaw = `auction/profiles/${userName}`;
export const listingsEndpointCreate = "auction/listings";
