export async function httpGet(url: string) {
  return await fetch(url, { method: 'GET' });
}

export async function httpPost(url: string, body: any) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  return await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: headers });
}
