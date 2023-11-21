import { useUser } from '@/states/user';
import { httpGet } from './http';

export const BLUR_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getHomeFeed(): Promise<HomeFeedResponse> {
  return (await httpGet(`${API_BASE_URL}/recommendation`)).json();
}

// returns true if redirect is needed
export async function kakaoLoginCallback(
  code: string,
  state: string,
): Promise<boolean | undefined> {
  const res = await httpGet(`${API_BASE_URL}/login/oauth2/kakao?code=${code}&state=${state}`);
  // error
  if (res.status >= 400) {
    return undefined;
  }

  // get tokens
  const access = res.headers.get('Authorization') ?? undefined;
  const refresh = res.headers.get('Authorization-Refresh') ?? undefined;

  // set user state
  useUser.setState({ accessToken: access, refreshToken: refresh });

  // redirect(true) if no refresh
  return refresh === undefined;
}
