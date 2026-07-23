export function getTaobaoId(url) {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams.get("id");
  } catch (error) {
    return null;
  }
}
