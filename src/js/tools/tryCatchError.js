export function tryCatchError(message) {
  const displayError = document.querySelector(".tryCatchContainer");
  displayError.innerHTML = `An error has occurred: ${message}`;
}
