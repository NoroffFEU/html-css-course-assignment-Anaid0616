import { API_URL } from "./constants.mjs";
const API_URL = "https://api.noroff.dev/api/v1/gamehub";

const loaderDiv = document.getElementById("loader");

function showLoader() {
  loaderDiv.classList.add("show");
}

function hideLoader() {
  loaderDiv.classList.remove("show");
}

function getPosts() {
  showLoader();
  fetch();
}
