import { profile } from "../../ui/listeners/auth/profile.js";
import { logout } from "../auth/logout.js";
import { updateLoginStatus } from "../auth/updateLoginStatus.js";
import { renderProfile } from "./renderProfile.js";

window.addEventListener("DOMContentLoaded", (event) => {
  profile();
  renderProfile();
  logout();
  updateLoginStatus();
});
