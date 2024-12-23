import { login } from "../../../api/auth/login.js";
import {
  baseURL,
  emailLogin,
  loginEndpoint,
  passwordLogin,
} from "../../../api/constants.js";
import { save } from "../../../storage/save.js";

document.getElementById("loginForm").addEventListener("submit", requestLogin);
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

async function requestLogin(event) {
  event.preventDefault();

  const emailLoginInput = emailLogin.value;
  const passwordLoginInput = passwordLogin.value;

  const loginUserData = {
    email: `${emailLoginInput}`,
    password: `${passwordLoginInput}`,
  };

  try {
    const URL = baseURL + loginEndpoint;
    const loginUser = await login(URL, loginUserData);

    if (loginUser) {
      document.getElementById("displayError").innerHTML = "";
      document.getElementById(
        "displaySuccess"
      ).innerHTML = `User registration successful. Welcome, ${loginUser.data.name}!`;
      emailLogin.value = "";
      passwordLogin.value = "";
    }
    // set accesToken og loginstatus
    setTimeout(function () {
      const accessToken = loginUser.data.accessToken;
      save("accessToken", accessToken);
      save("loginStatus", true);
      save("userProfile", {
        username: loginUser.data.name,
        email: loginUser.data.email,
        avatar: loginUser.data.avatar,
      });
      window.location.reload();
    }, 1500);
  } catch (error) {
    document.getElementById(
      "displayError"
    ).innerHTML = `Login failed: ${error}`;
  }
}
