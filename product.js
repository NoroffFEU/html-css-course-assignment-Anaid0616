document.addEventListener("DOMContentLoaded", async function () {
  const productId = "cac3b2cd-1611-4007-9883-3adf6f74948f";
  const API_URL = "https://api.noroff.dev/api/v1/gamehub";

  try {
    const response = await fetch(`${API_URL}/${productId}`);

    const product = await response.json();

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
    productImage.src = "https://static.noroff.dev/api/gamehub/8-cyberpunk.jpg";
    productImage.alt = product.title;
    addToCartButton.href = `../checkout/index.html?product=${productId}`;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});
