import { load } from "../../../storage/load.js";

export function profile() {
  const loggedIn = load("loginStatus");
  const userProfile = load("userProfile");

  console.log(loggedIn, userProfile.email);

  if (loggedIn === true) {
    console.log(`hi ${userProfile.username}`);
  }
}

profile();
