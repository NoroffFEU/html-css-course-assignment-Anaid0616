import { addToCart, updateCartCounter } from "./cart.mjs";
import { fetchData } from "./fetchData.mjs";
import { API_URL } from "./constants.mjs";
import { showLoader } from "./loader.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  const productId = "cac3b2cd-1611-4007-9883-3adf6f74948f";
  const API_SINGLE_URL =
    "https://static.noroff.dev/api/gamehub/8-cyberpunk.jpg";

  try {
    const response = await fetch(`${API_URL}/${productId}`);
    const product = await response.json();
    console.log(product);

    const productTitle = document.querySelector(".product-content h2");
    const productGenre = document.querySelector(".product-content .genre");
    const productPrice = document.querySelector(".product-content h3");
    const productDescription = document.querySelector(
      ".product-content .description"
    );
    const productImage = document.querySelector(".product-img");
    const addToCartButton = document.querySelector(".cta-button");

    productTitle.textContent = product.title;
    productGenre.textContent = product.genre;
    productPrice.textContent = product.price;
    productDescription.textContent = product.description;
    productImage.src = API_SINGLE_URL;
    productImage.alt = product.title;

    addToCartButton.textContent = "Add to cart";
    console.log("add to cart");
    addToCartButton.href = `javascript:void(0);`;

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Add event listener to "Add to cart" button
    addToCartButton.addEventListener("click", function () {
      addToCart(product, cartItems); // Add the current product to the cart
    });

    // Update cart counter
    updateCartCounter();
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});
