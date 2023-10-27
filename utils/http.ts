export async function httpGet(url: string) {
  return await fetch(url, { method: "GET" });
}
