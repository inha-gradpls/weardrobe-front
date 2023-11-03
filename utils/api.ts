import { httpGet } from './http';

export const BLUR_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getHomeFeed(): Promise<HomeFeedResponse> {
  return (await httpGet(`${API_BASE_URL}/recommendation`)).json();
}
