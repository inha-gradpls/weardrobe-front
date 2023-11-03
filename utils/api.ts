import { httpGet } from './http';

export const BLUR_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getHomeFeed(): Promise<HomeFeedResponse> {
  // return (await httpGet(`${API_BASE_URL}/recommendation`)).json();
  const products: Product[] = [];

  for (let i = 0; i < 20; i++) {
    products.push({
      id: i,
      sellerId: 0,
      buyerId: 0,
      categoryId: 0,
      brandId: 0,
      name: `상품${i}`,
      price: 100000,
      deliveryAvailable: false,
      purchaseDate: '',
      productImage: '',
      description: '',
      productStatus: '',
      viewCount: 0,
      createdAt: '',
    });
  }
  return new Promise<HomeFeedResponse>((res) => res(products));
}
