import axios from "axios";

export async function checkImageExists(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'blob' });
    console.log(response)
    if (response.status === 404) {
      console.log("Image not found (NoSuchKey on server).");
      return false;
    }
    return response.ok;
  } catch (error) {
    // console.error("Fetch error:", error); Silently ignore
    return false;
  }
}