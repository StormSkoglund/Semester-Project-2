// Countdown from a given date. Code originate from W3Schools. (No Date). How To Create a Countdown Timer - W3Schools. https://www.w3schools.com/howto/howto_js_countdown.asp Available at: W3Schools (Accessed: 30 April 2024)

export function renderCountdown(auctionEnd, renderContainer) {
  let countDownDate = new Date(auctionEnd).getTime();

  let clearCountdown = setInterval(function () {
    let now = new Date().getTime();
    let distance = countDownDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance >= 0) {
      renderContainer.innerHTML = "";
      renderContainer.innerHTML += `<div class="d-flex justify-content-end my-border-bottom"><p class="p-large">Ends at: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds</p></div>`;
    }

    if (distance < 0) {
      clearInterval(clearCountdown);
      renderContainer.innerHTML = `<div class="d-flex justify-content-end my-border-bottom"><p class="p-large">Auction has ended</p></div>`;
    }
  }, 1000);
}
