import { getProfile } from "./getProfile.js";

export async function renderProfile() {
  const profileContent = await getProfile();

  console.log(profileContent);

  document.getElementById(
    "creditsContainer"
  ).innerHTML = `<div class="mb-3 col-6 d-flex row align-items-center m-auto">
  <div class="header4 m-2">Your Wallet</div>
  <div class="bg-primary my-border-thin p-5 d-flex d-row justify-content-around align-items-center">
    <h5 class="card-title text-light">Sell items to gain more credit</h5>
    <div class="input-group w-25 align-self-center">
      <span class="input-group-text " id="basic-addon1"></span>
      <input type="numbers" class="form-control" placeholder="${profileContent.data.credits}" aria-label="Credit" aria-describedby="basic-addon1">
      
    </div>
  </div>
</div>`;
}
