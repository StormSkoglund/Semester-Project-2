import { load } from "../../storage/load.js";

export function updateLoginStatus() {
  let logoutButton = document.getElementById("logOut");
  let loginButton = document.getElementById("logIn");
  let registerButton = document.getElementById("register");
  let sellLink = document.getElementById("sellLink");
  let profileLink = document.getElementById("profileLink");

  const isLoggedIn = load("loginStatus");

  if (isLoggedIn) {
    logoutButton.style.display = "block";
    loginButton.style.display = "none";
    registerButton.style.display = "none";
  } else {
    logoutButton.style.display = "none";
    loginButton.style.display = "block";
    registerButton.style.display = "block";
    sellLink.style.display = "none";
    profileLink.style.display = "none";
  }
}
