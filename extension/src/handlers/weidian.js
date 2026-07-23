export function getWeidianId(url) {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.searchParams.get("itemID") ||
      parsedUrl.searchParams.get("itemId") ||
      parsedUrl.searchParams.get("id")
    );
  } catch (error) {
    return null;
  }
}
