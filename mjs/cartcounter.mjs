import { addToCart, updateCartCounter } from "./cart.mjs";

document.addEventListener("DOMContentLoaded", function () {
  console.log("Checkout page loaded");
  updateCartCounter(); // Update cart counter when the checkout page loads
});
