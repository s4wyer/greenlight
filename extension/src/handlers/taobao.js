export function getTaobaoId(url) {
  try {
    if (url.includes("taobao.com") || url.includes("tmall.com")) {
      const parsedUrl = new URL(url);
      return parsedUrl.searchParams.get("id");
    }
  } catch (error) {
    return null;
  }
  return null;
}
