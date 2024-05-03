export function addToCart(product, cartItems) {
  console.log("Adding product to cart:", product);
  cartItems.push(product);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartCounter();
  alert("Product added to cart!");
}

export function updateCartCounter() {
  const cartCountElement = document.getElementById("cart-count");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartCountElement.textContent = cartItems.length;
}
