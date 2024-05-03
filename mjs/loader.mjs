const API_URL = "https://api.noroff.dev/api/v1/gamehub";

// Function to show the loader
function showLoader() {
  loader.style.display = "block";
}

// Function to hide the loader
function hideLoader() {
  loader.style.display = "none";
}

// Function to fetch data based on dropdown selection
async function fetchData(option) {
  try {
    showLoader(); // Show the loader

    // Simulate fetching data based on the selected option
    const response = await fetch(`API_URL${option}`);
    const data = await response.json();

    // Display the fetched data
    dataContainer.textContent = JSON.stringify(data);

    hideLoader(); // Hide the loader after data is fetched
  } catch (error) {
    console.error("Error fetching data:", error);
    hideLoader(); // Hide the loader on error
  }
}

// Event listener for dropdown change
dropdown.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  fetchData(selectedOption); // Fetch data when dropdown value changes
});
