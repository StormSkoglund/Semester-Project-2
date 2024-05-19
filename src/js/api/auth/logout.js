import { remove } from "../../storage/remove.js";

export function logout() {
  document.getElementById("logOut").addEventListener("click", function () {
    remove("loginStatus");
    remove("accessToken");
    setTimeout(function () {
      window.location.reload();
    }, 500);
  });
}
