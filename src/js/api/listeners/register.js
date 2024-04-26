import * as userReg from "../auth/register";
import * as regInput from "../constants";

// Form Validation (Compare passwords)
document
  .getElementById("regSubmit")
  .addEventListener("click", function (event) {
    const passwordInput = regInput.password.value;
    const confirmInput = regInput.confirmPassword.value;

    if (passwordInput !== confirmInput) {
      regInput.showError.innerHTML = "Passwords doesn't match";
    }
    event.preventDefault();
  });

// Form Validation (count number of password letters)
