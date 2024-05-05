import { updateCartCounter } from "./cart.mjs";

const API_SINGLE_URL = "https://static.noroff.dev/api/gamehub/8-cyberpunk.jpg";

document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartWrapper = document.querySelector(".cart-wrapper");
  const titleWrapper = document.querySelector(".genretitle");
  const imgWrapper = document.querySelector(".imgWrapper");
  const quantityCounter = document.querySelector(".cart-count");
  quantityCounter.innerHTML = 0;

  // Function to render cart items on the checkout page
  function renderCartItems() {
    cartWrapper.innerHTML = "";
    cartWrapper.classList.add("cart-wrapper");

    const itemMap = {};

    cartItems.forEach((item) => {
      if (itemMap[item.id]) {
        itemMap[item.id].quantity++;
      } else {
        itemMap[item.id] = { ...item, quantity: 1 };
      }
    });

    Object.values(itemMap).forEach((item) => {
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
      titleElement.classList.add("img-title");

      const genreElement = document.createElement("p");
      genreElement.textContent = item.genre;
      genreElement.classList.add("genre-checkout");

      const priceElement = document.createElement("p");
      priceElement.textContent = `Price: $${item.price.toFixed(2)}`;
      priceElement.classList.add("oneItem-price");

      // Quantity Control Buttons
      const removeButton = document.createElement("button");
      removeButton.textContent = "-";
      removeButton.classList.add("quantity-control");
      removeButton.addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity--;
          updateCartItem(item);
        }
      });

      // Quantity
      const quantityElement = document.createElement("p");
      quantityElement.textContent = `Quantity: ${item.quantity}`;
      quantityElement.classList.add("quantity-checkout");

      const addButton = document.createElement("button");
      addButton.textContent = "+";
      addButton.classList.add("quantity-control");
      addButton.addEventListener("click", () => {
        item.quantity++;
        updateCartItem(item);
      });

      // Function to update cart item
      function updateCartItem(updatedItem) {
        // Find item to update in the cartItems array
        const index = cartItems.findIndex(
          (cartItem) => cartItem.id === updatedItem.id
        );

        if (index !== -1) {
          // Update the item in the cartItems array
          cartItems[index].quantity = updatedItem.quantity;

          // Update localStorage with the updated cartItems array
          localStorage.setItem("cart", JSON.stringify(cartItems));

          // Re-render cart items to reflect the changes
          renderCartItems();
        }
      }

      // Remove Button
      const removeItemButton = document.createElement("button");
      removeItemButton.textContent = "Remove";
      removeItemButton.classList.add("remove-item");
      removeItemButton.addEventListener("click", () => {
        cartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCartItems();
      });

      // Total Price
      const totalElement = document.createElement("p");
      const totalPrice = item.price * item.quantity;
      totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
      totalElement.classList.add("total-price");

      // Append elements to cart item container
      cartItemElement.appendChild(titleElement);
      cartItemElement.appendChild(genreElement);
      cartItemElement.appendChild(priceElement);
      cartItemElement.appendChild(removeButton);
      cartItemElement.appendChild(quantityElement);
      cartItemElement.appendChild(addButton);
      cartItemElement.appendChild(removeItemButton);

      cartItemElement.appendChild(totalElement);
      imgWrapper.appendChild(imgContainer);
      cartWrapper.appendChild(imgWrapper);
      cartWrapper.appendChild(titleWrapper);
      cartWrapper.appendChild(cartItemElement);
      titleWrapper.appendChild(titleElement);
      titleWrapper.appendChild(genreElement);
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
