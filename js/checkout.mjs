import { updateCartCounter } from "./cart.mjs";

const API_SINGLE_URL = "https://static.noroff.dev/api/gamehub/8-cyberpunk.jpg";

document.addEventListener("DOMContentLoaded", function () {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartWrapper = document.querySelector(".cart-wrapper");

  // Function to render cart items on the checkout page
  function renderCartItems() {
    // cartWrapper.innerHTML = ""; // Clear existing content

    cartItems.forEach((item) => {
      const cartItemElement = document.createElement("div");
      cartItemElement.classList.add("img-title");

      // Image
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("checkout-img-container");
      const itemImage = document.createElement("img");
      itemImage.src = API_SINGLE_URL;
      itemImage.alt = item.title;
      itemImage.classList.add("checkout-img");
      imgContainer.appendChild(itemImage);

      // Title
      const titleElement = document.createElement("h3");
      titleElement.textContent = item.title;
      titleElement.classList.add("item-title");

      // Genre
      const genreElement = document.createElement("p");
      genreElement.textContent = item.genre;
      genreElement.classList.add("genre-checkout");

      // Price
      const priceElement = document.createElement("p");
      priceElement.textContent = `$${item.price.toFixed(2)}`; // Format price as needed
      priceElement.classList.add("price-checkout");

      // Append elements to cart item container
      cartItemElement.appendChild(imgContainer);
      cartItemElement.appendChild(titleElement);
      cartItemElement.appendChild(genreElement);
      cartItemElement.appendChild(priceElement);

      // Add other elements as needed (e.g., quantity, remove buttons)

      // Append cart item to cart wrapper
      cartWrapper.appendChild(cartItemElement);
    });

    // Update total price
    updateTotalPrice();
  }

  // Function to calculate and display total price
  function updateTotalPrice() {
    const totalPriceElement = document.querySelector(".price");
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Initial rendering of cart items
  renderCartItems();

  // Update cart counter
  updateCartCounter();
});
