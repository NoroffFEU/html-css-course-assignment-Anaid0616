import { API_URL } from "./constants.mjs";
import { hideLoader, showLoader } from "./loader.mjs";

export async function fetchData() {
  try {
    showLoader();
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    hideLoader();
  }
}
