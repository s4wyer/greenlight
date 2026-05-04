export async function getFinalUrl(targetUrl) {
  try {
    const response = await fetch(targetUrl);

    return response.url;
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}
