import { authFetch } from "../../../api/authFetch.js";
import { baseURL, profileEndpointRaw } from "../../../api/constants.js";
import { load } from "../../../storage/load.js";
import { save } from "../../../storage/save.js";

document
  .getElementById("updateForm")
  .addEventListener("submit", updateProfiledata);

export async function updateProfiledata(event) {
  event.preventDefault();

  const editAvatar = document.getElementById("updateAvatar");
  const updatedAvatar = editAvatar.value;

  const newAvatarData = {
    avatar: {
      url: `${updatedAvatar}`,
      alt: "The users avatar",
    },
  };
  const response = await authFetch(baseURL + profileEndpointRaw, {
    method: "PUT",
    body: JSON.stringify(newAvatarData),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message || "update failed");
  } else {
    const userProfile = load("userProfile");
    userProfile.avatar.url = json.data.avatar.url;
    save("userProfile", userProfile);

    location.reload(true);
  }

  return await json;
}
