import axios from 'axios'


// Configure these
export const PRODUCTS_API_BASE = import.meta.env.VITE_PRODUCTS_API_BASE || 'http://localhost:4000'
export const BACKEND_API_BASE = import.meta.env.VITE_BACKEND_API_BASE || 'http://localhost:4000'


export async function fetchAllProducts() {
  try {
    const res = await axios.get(`${PRODUCTS_API_BASE}/api/products/all`);
    const data = res.data?.data?.products || res.data || [];

    const fixed = data.map((p) => ({
      ...p,
      images: (p.images || []).map((img) => ({
        ...img,
        url:
          img?.url && typeof img.url === "string"
            ? img.url.startsWith("http")
              ? img.url
              : `${PRODUCTS_API_BASE}${img.url.startsWith("/") ? "" : "/"}${img.url}`
            : "",
      })),
      video:
        p.video && typeof p.video?.url === "string"
          ? {
              ...p.video,
              url: p.video.url.startsWith("http")
                ? p.video.url
                : `${PRODUCTS_API_BASE}${p.video.url.startsWith("/") ? "" : "/"}${p.video.url}`,
            }
          : null,
    }));

    console.log("✅ Sample product with fixed URLs:", fixed[1]);
    return fixed;
  } catch (err) {
    console.error("fetchAllProducts error:", err);
    throw new Error("Failed to load products");
  }
}

export async function sendEnquiry(payload){
const res = await axios.post(`${BACKEND_API_BASE}/api/enquiry`, payload)
return res.data
}