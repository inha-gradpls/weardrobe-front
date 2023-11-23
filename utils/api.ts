import { useUser } from '@/states/user';
import { httpGet } from './http';

export const BLUR_URL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getHomeFeed(order: ProductOrder): Promise<HomeFeedResponse> {
  // return (await httpGet(`${API_BASE_URL}/recommendation?filter=${order}&direction=DESC`)).json();
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

export async function getFilters(): Promise<FilterResponse> {
  // return (await httpGet(`${API_BASE_URL}/search/filters`)).json();
  return {
    categoryFilter: [
      {
        id: 1,
        name: '아우터',
        parentId: null,
        parentName: null,
      },
      {
        id: 2,
        name: '상의',
        parentId: null,
        parentName: null,
      },
      {
        id: 3,
        name: '원피스',
        parentId: null,
        parentName: null,
      },
      {
        id: 4,
        name: '팬츠',
        parentId: null,
        parentName: null,
      },
      {
        id: 5,
        name: '스커트',
        parentId: null,
        parentName: null,
      },
      {
        id: 6,
        name: '가방',
        parentId: null,
        parentName: null,
      },
      {
        id: 7,
        name: '악세사리',
        parentId: null,
        parentName: null,
      },
      {
        id: 8,
        name: '신발',
        parentId: null,
        parentName: null,
      },
      {
        id: 9,
        name: '가디건',
        parentId: 1,
        parentName: '아우터',
      },
      {
        id: 10,
        name: '자켓',
        parentId: 1,
        parentName: '아우터',
      },
      {
        id: 11,
        name: '집업',
        parentId: 1,
        parentName: '아우터',
      },
      {
        id: 12,
        name: '코트',
        parentId: 1,
        parentName: '아우터',
      },
      {
        id: 13,
        name: '패딩',
        parentId: 1,
        parentName: '아우터',
      },
      {
        id: 14,
        name: '민소매',
        parentId: 2,
        parentName: '상의',
      },
      {
        id: 15,
        name: '반팔티셔츠',
        parentId: 2,
        parentName: '상의',
      },
      {
        id: 16,
        name: '긴팔티셔츠',
        parentId: 2,
        parentName: '상의',
      },
      {
        id: 17,
        name: '니트',
        parentId: 2,
        parentName: '상의',
      },
      {
        id: 18,
        name: '맨투맨',
        parentId: 2,
        parentName: '상의',
      },
      {
        id: 19,
        name: '블라우스',
        parentId: 2,
        parentName: '상의',
      },
      {
        id: 20,
        name: '셔츠',
        parentId: 2,
        parentName: '상의',
      },
      {
        id: 21,
        name: '후드',
        parentId: 2,
        parentName: '상의',
      },
      {
        id: 22,
        name: '미니원피스',
        parentId: 3,
        parentName: '원피스',
      },
      {
        id: 23,
        name: '롱원피스',
        parentId: 3,
        parentName: '원피스',
      },
      {
        id: 24,
        name: '투피스',
        parentId: 3,
        parentName: '원피스',
      },
      {
        id: 25,
        name: '점프수트',
        parentId: 3,
        parentName: '원피스',
      },
      {
        id: 26,
        name: '롱팬츠',
        parentId: 4,
        parentName: '팬츠',
      },
      {
        id: 27,
        name: '숏팬츠',
        parentId: 4,
        parentName: '팬츠',
      },
      {
        id: 28,
        name: '슬랙스',
        parentId: 4,
        parentName: '팬츠',
      },
      {
        id: 29,
        name: '데님',
        parentId: 4,
        parentName: '팬츠',
      },
      {
        id: 30,
        name: '미니스커트',
        parentId: 5,
        parentName: '스커트',
      },
      {
        id: 31,
        name: '롱스커트',
        parentId: 5,
        parentName: '스커트',
      },
      {
        id: 32,
        name: '크로스백',
        parentId: 6,
        parentName: '가방',
      },
      {
        id: 33,
        name: '숄더백',
        parentId: 6,
        parentName: '가방',
      },
      {
        id: 34,
        name: '토트백',
        parentId: 6,
        parentName: '가방',
      },
      {
        id: 35,
        name: '에코백',
        parentId: 6,
        parentName: '가방',
      },
      {
        id: 36,
        name: '백팩',
        parentId: 6,
        parentName: '가방',
      },
      {
        id: 37,
        name: '귀걸이',
        parentId: 7,
        parentName: '악세사리',
      },
      {
        id: 38,
        name: '목걸이',
        parentId: 7,
        parentName: '악세사리',
      },
      {
        id: 39,
        name: '반지',
        parentId: 7,
        parentName: '악세사리',
      },
      {
        id: 40,
        name: '팔찌',
        parentId: 7,
        parentName: '악세사리',
      },
      {
        id: 41,
        name: '발찌',
        parentId: 7,
        parentName: '악세사리',
      },
      {
        id: 42,
        name: '로퍼',
        parentId: 8,
        parentName: '신발',
      },
      {
        id: 43,
        name: '힐',
        parentId: 8,
        parentName: '신발',
      },
      {
        id: 44,
        name: '운동화',
        parentId: 8,
        parentName: '신발',
      },
      {
        id: 45,
        name: '샌들',
        parentId: 8,
        parentName: '신발',
      },
      {
        id: 46,
        name: '슬리퍼',
        parentId: 8,
        parentName: '신발',
      },
      {
        id: 47,
        name: '부츠',
        parentId: 8,
        parentName: '신발',
      },
    ],
    brandFilter: [
      {
        id: 2,
        name: '나이키',
      },
      {
        id: 1,
        name: '보세',
      },
    ],
  };
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
