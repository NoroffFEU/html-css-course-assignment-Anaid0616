import { updateCartCounter } from "./cart.mjs";
import { API_BASE_URL } from "./constants.mjs";
import { fetchData } from "./fetchData.mjs";

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-container");
    const quantityCounter = document.querySelector(".cart-count");

    let totalQuantity = 0;

    // Function to render cart items on the checkout page
    function renderCartItems() {
      cartContainer.innerHTML = "";

      const itemMap = {};

      //Group items by ID and count
      cartItems.forEach((item) => {
        console.log(item);
        totalQuantity += item.quantity;
        if (itemMap[item.id]) {
          itemMap[item.id].quantity += item.quantity;
        } else {
          itemMap[item.id] = { ...item };
        }
      });

      Object.values(itemMap).forEach((item) => {
        const cartWrapper = document.createElement("div");
        cartWrapper.classList.add("cart-wrapper");

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("imgWrapper");

        const titleWrapper = document.createElement("div");
        titleWrapper.classList.add("genre-title");

        const cartItemElement = document.createElement("div");
        cartItemElement.classList.add("item-info");

        // Image
        const imgContainer = document.createElement("div");
        imgContainer.classList.add("checkout-img-container");
        const itemImage = document.createElement("img");
        itemImage.src = item.image;
        itemImage.alt = item.description;
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

            renderCartItems();
            // Update total price
            updateTotalPrice();
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
          updateTotalPrice();
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

        cartItemElement.appendChild(quantityElement);
        cartItemElement.appendChild(removeButton);
        cartItemElement.appendChild(addButton);
        cartItemElement.appendChild(removeItemButton);
        cartItemElement.appendChild(totalElement);
        imgWrapper.appendChild(imgContainer);
        cartWrapper.appendChild(imgWrapper);
        cartWrapper.appendChild(titleWrapper);
        cartWrapper.appendChild(cartItemElement);
        titleWrapper.appendChild(titleElement);
        titleWrapper.appendChild(genreElement);
        cartContainer.appendChild(cartWrapper);
      });

      // Update total quantity in cart counter
      quantityCounter.innerHTML = totalQuantity;

      // Update total price
      updateTotalPrice();
    }

    // Function to calculate and display total price
    function updateTotalPrice() {
      const totalPriceElement = document.querySelector(".total-price");
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
      totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }

    // Initial rendering of cart items
    renderCartItems();

    // Update cart counter
    updateCartCounter();
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});
