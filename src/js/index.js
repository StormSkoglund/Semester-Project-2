import { logout } from "./api/auth/logout.js";
import { updateLoginStatus } from "./api/auth/updateLoginStatus.js";
import { carouselListings } from "./api/listings/carouselListings.js";
import { renderListings } from "./api/listings/renderListings.js";

carouselListings();
renderListings();
updateLoginStatus();
logout();
