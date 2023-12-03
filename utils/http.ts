import { API_BASE_URL } from './api';

export const NEED_LOGIN = 'need_login';

export async function httpGet(url: string, retry: boolean = true, signal?: AbortSignal) {
  const headers = createHeaders();
  const getRes = (headers: Headers, signal?: AbortSignal) =>
    fetch(url, {
      method: 'GET',
      headers: headers,
      signal: signal,
    });

  return doGetRes(getRes, headers, retry, signal);
}

export async function httpPost(
  url: string,
  body: any,
  json: boolean,
  retry: boolean = true,
  signal?: AbortSignal,
  refresh: boolean = false,
) {
  const headers = createHeaders(refresh);
  if (json) headers.set('Content-Type', 'application/json');
  const getRes = (headers: Headers, signal?: AbortSignal) =>
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: json ? JSON.stringify(body) : body,
      signal: signal,
    });
  return doGetRes(getRes, headers, retry, signal);
}

async function refreshToken(signal?: AbortSignal) {
  const res = await httpPost(`${API_BASE_URL}/auth/refresh`, undefined, false, false, signal, true);
  if (!res || res.status !== 200) {
    return undefined;
  }

  // update tokens
  const refresh = res.headers.get('Authorization-Refresh') ?? undefined;
  const access = res.headers.get('Authorization') ?? undefined;
  if (refresh) localStorage.setItem('refreshToken', refresh);
  if (access) sessionStorage.setItem('accessToken', access);

  return { access, refresh };
}

async function preRetry(headers: Headers, signal?: AbortSignal) {
  const newTokens = await refreshToken(signal);
  if (!newTokens) {
    if (!signal?.aborted) document.dispatchEvent(new CustomEvent(NEED_LOGIN));
    return false;
  }
  const access = newTokens.access ?? sessionStorage.getItem('accessToken');
  if (!access) return false;
  headers.set('Authorization', access);
  return true;
}

async function doGetRes(
  getRes: (headers: Headers, signal?: AbortSignal) => Promise<Response>,
  headers: Headers,
  retry: boolean,
  signal?: AbortSignal,
): Promise<Response | undefined> {
  try {
    const res = await getRes(headers, signal);
    if (res.status >= 400) {
      if (res.status === 401) throw Error();
      else return undefined;
    }
    return res;
  } catch (e) {
    if (!retry) return;
    if ((await preRetry(headers, signal)) === false) return;
  }
  return await doGetRes(getRes, headers, false, signal);
}

function createHeaders(refresh: boolean = false) {
  const headers = new Headers();
  const accessToken = sessionStorage.getItem('accessToken');
  if (refresh) {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken && refreshToken.length > 0) headers.set('Authorization-Refresh', refreshToken);
  } else if (accessToken && accessToken.length > 0) headers.set('Authorization', accessToken);

  return headers;
}
