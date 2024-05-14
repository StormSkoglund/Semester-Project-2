import { load } from "../../../storage/load.js";

export function profile() {
  const loggedIn = load("loginStatus");
  const userProfile = load("userProfile");

  console.log(loggedIn, userProfile.email);

  if (loggedIn === true) {
    document.getElementById(
      "profileContainer"
    ).innerHTML += `<p class="header2 text-center">${userProfile.username}</p><img class="d-block col-4 m-auto rounded-circle my-border-blue" src="${userProfile.avatar.url}" alt="${userProfile.avatar.alt}">`;
  } else {
    document.getElementById(
      "profileContainer"
    ).innerHTML += `<p class="p-large text-center"> Please register or log in to view your account <p>`;
  }
}
