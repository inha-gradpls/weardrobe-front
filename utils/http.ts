import { useUser } from '@/states/user';

export async function httpGet(url: string, auth: boolean = true) {
  const headers = new Headers();
  if (auth) buildHeader(headers);
  return await fetch(url, { method: 'GET', headers: headers });
}

export async function httpPost(url: string, body: any, auth: boolean = true) {
  const headers = new Headers();
  if (auth) buildHeader(headers);
  headers.set('Content-Type', 'application/json');
  return await fetch(url, { method: 'POST', body: JSON.stringify(body), headers: headers });
}

function buildHeader(headers: Headers) {
  headers.set('Authorization', useUser.getState().accessToken ?? '');
}
