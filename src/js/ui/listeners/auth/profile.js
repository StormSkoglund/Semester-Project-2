import { load } from "../../../storage/load.js";

export function profile() {
  const token = load("accessToken");
  const loggedIn = load("loginStatus");
  const userProfile = load("userProfile");

  if (loggedIn === true && typeof token === "string") {
    /* document.getElementById(
      "profileContainer"
    ).innerHTML += `<p class="header2 text-center">${userProfile.username}</p><img class="d-block col-4 m-auto pro-list-img rounded-circle" src="${userProfile.avatar.url}" alt="${userProfile.avatar.alt}">`;*/
  } else if (
    loggedIn === false ||
    token !== "string" ||
    localStorage.length === 0
  ) {
    document.getElementById(
      "profileContainer"
    ).innerHTML += `<p class="p-large text-center"> Please register or log in to view your account <p>`;
  }
}
