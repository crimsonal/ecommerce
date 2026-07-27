import axios from "axios";
import api from "../api/client"
export async function checkImageExists(imageUrl) { // POTENTIAL FIX: Store whether an image exists in your database.
  try {
    const response = await axios.get(imageUrl, { responseType: 'blob', validateStatus: status => status < 500});
    if (response.status === 404) {
      console.log("Image not found (NoSuchKey on server).");
      return false;
    }
    return true;
  } catch (error) {
    // console.error("Fetch error:", error); Silently ignore
    return false;
  }
}

export async function getAndSetIcon(icon, setSource) {
  try {
    const res = await api.get(`/products/url?key=${icon}`)
    const imageUrl = res.data.url 
    
    if (!checkImageExists(imageUrl)) {
        setSource("")
    } else {
        setSource(imageUrl)
    }
  } catch (err) {
      console.error("Failed to retreive presigned image: ", err)
  }
}
