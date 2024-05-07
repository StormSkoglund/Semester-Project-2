import { login } from "../../../api/auth/login.js";
import {
  baseURL,
  emailLogin,
  loginEndpoint,
  passwordLogin,
} from "../../../api/constants.js";

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

  console.log(loginUserData);

  try {
    const URL = baseURL + loginEndpoint;
    const loginUser = await login(URL, loginUserData);
    console.log(loginUser);
    if (loginUser) {
      document.getElementById(
        "displaySuccess"
      ).innerHTML = `User registration successful. Welcome, ${loginUser.data.name}!`;
    }
    // set accesToken
    const accessToken = loginUser.data.accessToken;
    localStorage.setItem("accessToken", accessToken);
  } catch (error) {
    document.getElementById(
      "displayError"
    ).innerHTML = `Registration failed: ${error}`;
  }
}

/*(response.ok) {
        `User registration successful. Welcome, ${regData.data.name}!`;
      } else {
        throw new Error("User does not exist.");
      }
      const json = await response.json();
      const accessToken = json.accessToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          userInputname: json.name,
          userMail: json.email,
        })
      );
  
      return json;
    } catch (error) {
      tryCatchError(error.message);
    }
  } */
