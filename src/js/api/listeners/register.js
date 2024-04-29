import * as userReg from "../../api/auth/register.js";
import * as regInput from "../constants.js";

// Form Validation (Compare passwords)
document
  .getElementById("regSubmit")
  .addEventListener("click", function (event) {
    const passwordInput = regInput.password.value;
    const confirmInput = regInput.confirmPassword.value;

    if (passwordInput !== confirmInput) {
      regInput.showError.innerHTML = "Passwords doesn't match";
      event.preventDefault();
    } else {
      regInput.showError.innerHTML = "";
    }
  });

document.getElementById("regSubmit").addEventListener("submit", requestReg);
document
  .getElementById("regSubmit")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

async function requestReg() {
  // Recieve input from registration form
  const emailValue = regInput.email.value;
  const usernameValue = regInput.username.value;
  const passwordValue = regInput.password.value;
  const avatarValue = regInput.avatar.value;

  const user = {
    name: `${usernameValue}`,
    email: `${emailValue}`,
    password: `${passwordValue}`,
    avatar: {
      url: `${avatarValue}`,
      alt: "The user avatar",
    },
    banner: {
      url: "https://fastly.picsum.photos/id/26",
      alt: "A collection of expensive items",
    },
    venueManager: true,
  };
  console.log(user);

  try {
    const response = await userReg.registerUser(user);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      regInput.successContainer.innerHTML = "User registration successful";
    }
  } catch (error) {
    regInput.showTryCatchError.innerHTML = "Registration failed: " + error;
  }
}
