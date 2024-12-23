import * as userReg from "../../../api/auth/register.js";
import * as regInput from "../../../api/constants.js";
import { save } from "../../../storage/save.js";
import { tryCatchError } from "../../../tools/tryCatchError.js";

// Form Validation (Compare passwords)
document
  .getElementById("regSubmit")
  .addEventListener("input", function (event) {
    const passwordInput = regInput.password.value;
    const confirmInput = regInput.confirmPassword.value;

    if (passwordInput !== confirmInput) {
      regInput.showError.innerHTML = "";
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
    bio: "",
    banner: {
      url: "https://picsum.photos/id/26/800/500",
      alt: "A collection of expensive items",
    },
    venueManager: true,
  };

  // Connor O' Briens solution for allowing blank inputs in the register form.
  if (avatarValue.trim() !== "") {
    user.avatar = {
      url: `${avatarValue}`,
      alt: `${usernameValue}'s avatar`,
    };
  } else {
    user.avatar = {
      url: "https://picsum.photos/id/26/800/500",
      alt: `${usernameValue}'s avatar`,
    };
  }

  try {
    const regData = await userReg.register(user);
    regInput.successContainer.innerHTML = `User registration successful. Welcome, ${regData.data.name}!`;
    save("userProfile", {
      username: regData.data.name,
      email: regData.data.email,
      avatar: regData.data.avatar,
    });

    regInput.email.value = "";
    regInput.username.value = "";
    regInput.password.value = "";
    regInput.avatar.value = "";

    document.getElementById("loginBtn").innerHTML = `<button
    type="button"
    class="mx-1 blue-btn"
    data-bs-toggle="modal"
    data-bs-target="#loginModal"
  >Login</button>`;
    document.getElementById("close").innerHTML = "";
  } catch (error) {
    tryCatchError(error);
  }
}
