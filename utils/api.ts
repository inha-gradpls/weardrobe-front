import { useUser } from '@/states/user';
import { httpGet, httpPost } from './http';

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

// fetches user info
// if number is undefined: currentUser, else: user with the id
export async function getUserInfo(id?: number): Promise<UserInfoResponse> {
  if (id === undefined)
    // return (await httpGet(`${API_BASE_URL}/users/my/profile`)).json();

    return {
      id: 1,
      name: 'asdf',
      nickname: 'asdf',
      imageUrl: '/example.png',
      age: 20,
      gender: 'FEMALE',
      createdDate: '2023-11-15',
      phoneNumber: '01000000000',
      reliableScore: 0.0,
    };
  // return (await httpGet(`${API_BASE_URL}/users/${id}/profile`)).json();
  return {
    id: id,
    nickname: 'qwer',
    imageUrl: '/example.png',
    createdDate: '2023-11-15',
    reliableScore: 0.0,
  };
}

// gets product info
export async function getProductInfo(productId: number): Promise<ProductInfoResponse | undefined> {
  if (productId < 0) return undefined;
  // return (await httpGet(`${API_BASE_URL}/products/${productId}`)).json();
  return {
    id: 2,
    name: '나이키 맨투맨',
    price: 10000,
    sellerId: productId % 2,
    sellerNickname: 'asdf',
    categoryParentName: '상의',
    categoryName: '맨투맨',
    brandName: '나이키',
    deliveryAvailable: true,
    productImage: '/example.png',
    description: lipsum,
    status: 'SELL',
    createDate: '2023-11-15T03:13:56.468592',
    viewCount: 4,
    heartCount: 1,
    commentCount: 0,
  };
}

export async function getSearchHistory(): Promise<SearchHistoryResponse> {
  // return (await httpGet(`${API_BASE_URL}/search/recent`)).json();
  return [
    {
      id: 11,
      word: 'abc',
    },
    {
      id: 10,
      word: 'abc',
    },
    {
      id: 9,
      word: 'abc',
    },
    {
      id: 8,
      word: '맨투맨',
    },
    {
      id: 7,
      word: '맨투맨',
    },
  ];
}

export async function getSearchResult(
  query: string,
  page: number,
  category?: string,
  delivery?: boolean,
  brand?: string,
): Promise<SearchResultResponse> {
  const categoryQuery = category ? `&categoryName=${category}` : '';
  const brandQuery = brand ? `&brandName=${brand}` : '';
  const deliveryQuery = delivery ? `&deliveryAvailable=${delivery}` : '';

  // return (
  //   await httpGet(
  //     `${API_BASE_URL}/search?productName=${query}${categoryQuery}${brandQuery}${deliveryQuery}`,
  //   )
  // ).json();
  return [
    {
      id: 2 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/ddca7a02-8dc9-4e98-9796-3194b063f84c.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:48.548834',
      viewCount: 1,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 3 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/7eb470f2-6b15-4552-b9d7-ab2ad681bb28.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:54.041375',
      viewCount: 0,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 4 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/ddca7a02-8dc9-4e98-9796-3194b063f84c.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:48.548834',
      viewCount: 1,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 5 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/7eb470f2-6b15-4552-b9d7-ab2ad681bb28.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:54.041375',
      viewCount: 0,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 6 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/ddca7a02-8dc9-4e98-9796-3194b063f84c.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:48.548834',
      viewCount: 1,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 7 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/7eb470f2-6b15-4552-b9d7-ab2ad681bb28.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:54.041375',
      viewCount: 0,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 8 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/ddca7a02-8dc9-4e98-9796-3194b063f84c.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:48.548834',
      viewCount: 1,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 9 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/7eb470f2-6b15-4552-b9d7-ab2ad681bb28.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:54.041375',
      viewCount: 0,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 10 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/ddca7a02-8dc9-4e98-9796-3194b063f84c.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:48.548834',
      viewCount: 1,
      heartCount: 0,
      commentCount: 0,
    },
    {
      id: 1 + page * 10,
      name: '나이키 맨투맨',
      price: 10000,
      productImage: '/images/7eb470f2-6b15-4552-b9d7-ab2ad681bb28.jpg',
      categoryParentName: '상의',
      categoryName: '맨투맨',
      createDate: '2023-11-20T19:33:54.041375',
      viewCount: 0,
      heartCount: 0,
      commentCount: 0,
    },
  ];
}

export async function getWardrobeData(): Promise<WardrobeDataResponse> {
  // return (await httpGet(`${API_BASE_URL}/viton`)).json();
  return {
    wardrobeUser: [
      {
        id: 66,
        userImage: '/example.png?',
      },
      {
        id: 83,
        userImage: '/example.png',
      },
    ],
    favoriteProduct: [
      {
        id: 74,
        name: '나이키 맨투맨',
        productImage: '/example.png',
      },
      {
        id: 76,
        name: '나이키 맨투맨2',
        productImage: '/example.png?',
      },
    ],
  };
}

export async function generateViton(data: VitonFormData) {
  // const res = await httpPost(`${API_BASE_URL}/viton`, data);
  // if (res.status !== 200) return undefined;
  // return res.json();

  return {
    vitonImage: '/example.png?asdfasdf',
  };
}

export async function signUp(data: SignUpFormData) {
  const res = await httpPost(`${API_BASE_URL}/oauth2/sign-up`, data);
  if (res.status !== 200) return undefined;
  return await res.json();
}

export const lipsum = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pulvinar, nulla quis viverra venenatis, metus sapien blandit urna, nec tristique sem justo non justo. Pellentesque semper massa nec dapibus luctus. Vestibulum facilisis ornare augue vel semper. Pellentesque id faucibus augue. Quisque ullamcorper tempor magna eget molestie. Etiam mattis a velit quis porttitor. Sed et posuere sapien, non convallis elit. Mauris tempor, metus non auctor accumsan, ante lacus posuere augue, ac scelerisque sem nunc luctus arcu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus sed dapibus risus, non tristique mi. Quisque vel euismod tellus. Pellentesque sit amet porttitor massa. Maecenas erat mi, eleifend a eleifend non, malesuada eget purus. Mauris ac enim lobortis nulla consequat elementum. Donec imperdiet, metus sed auctor bibendum, eros nulla blandit purus, vel convallis odio nulla id dui. Ut condimentum diam ut turpis tempus, a rhoncus arcu convallis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec lacinia elementum ex vitae vestibulum. Sed id est ultricies neque fermentum hendrerit. Duis molestie velit id eleifend ornare.
Etiam augue metus, venenatis eget facilisis ut, ornare ut elit. Morbi in sodales velit, in sollicitudin ligula. Donec ac ex pulvinar dolor elementum eleifend. Suspendisse eget tempus arcu. Quisque id vestibulum magna, ac sodales purus. Integer pulvinar lectus pulvinar, aliquet ipsum vel, iaculis nisl. Quisque maximus diam quis eros eleifend commodo.
Fusce molestie metus a nulla blandit bibendum. Aliquam at nunc non metus condimentum mollis. Ut elementum justo aliquet nibh mollis, a interdum urna iaculis. Fusce tempus nisi tristique urna laoreet, id facilisis nibh fermentum. Integer quis massa dolor. Mauris imperdiet mattis odio, eget fermentum turpis mattis nec. Mauris aliquet est mi, vel posuere sem accumsan id. Sed rutrum, magna sed feugiat faucibus, ante ante placerat erat, at dapibus lorem est eget nulla. Aenean id scelerisque lorem, eu tristique dui. Nam ornare est ac velit dictum vulputate quis at ex. Curabitur nec massa vel purus luctus ullamcorper eu in orci. In nec rhoncus tellus.
Pellentesque ac blandit sem. Aliquam sed fringilla lorem. Nulla sollicitudin massa ac auctor condimentum. Morbi velit magna, hendrerit id enim sit amet, malesuada ornare eros. Vestibulum laoreet diam ac leo hendrerit placerat. Nulla nec sem et eros posuere fermentum nec a purus. Donec elementum, sem quis auctor commodo, purus nibh lacinia justo, sed porttitor est elit non nulla. Etiam cursus dolor sit amet sem ornare tristique. Nam nisl sem, porttitor blandit dui sed, auctor luctus erat. Etiam nec aliquet diam. Proin tristique erat vitae nisi vestibulum dapibus in sed ligula. Praesent efficitur tellus et arcu fermentum, ut convallis augue interdum. In blandit orci sed nisl pharetra placerat. Sed consequat metus non nisl congue efficitur. Duis et vulputate ante.
Proin mollis erat ut sem posuere luctus. Mauris consectetur ligula nibh, non dignissim arcu convallis quis. Maecenas sollicitudin porttitor massa eu faucibus. Aenean fermentum facilisis lobortis. Integer feugiat augue ut nulla eleifend ornare. Vestibulum non condimentum nisl, pharetra fermentum sem. Mauris nec ante felis. Nam pharetra lobortis nunc, at gravida est placerat vitae.
In scelerisque vitae tortor id convallis. Proin sit amet dui eget est dictum volutpat. Quisque diam metus, condimentum sed sem in, elementum feugiat tellus. Aenean nec magna a leo congue bibendum et at nulla. Nam non feugiat neque. Sed in bibendum elit. Ut venenatis, sapien quis interdum blandit, arcu ante tempor tellus, ut sollicitudin nulla mi a orci. Interdum et malesuada fames ac ante ipsum primis in faucibus.
Praesent sit amet libero gravida, hendrerit lorem ut, laoreet leo. Quisque vitae fermentum est, eu lobortis ante. In et venenatis eros. Curabitur vitae bibendum velit. Donec ut massa mauris. Praesent non mi et erat aliquam volutpat. Duis at commodo justo. Aenean porta malesuada velit.
Quisque vitae diam ac mauris posuere egestas et id quam. Pellentesque et egestas ante. Etiam vel faucibus orci, non pellentesque ex. Maecenas nec tincidunt odio, at tincidunt lectus. Morbi ligula tortor, volutpat id magna et, scelerisque mattis augue. Suspendisse elementum ac libero vitae venenatis. Aliquam erat volutpat. Aliquam convallis purus nec velit faucibus, at porta tellus ultrices. Phasellus suscipit lectus vel sapien rutrum cursus id non odio. Curabitur eget ex rhoncus, mattis erat non, feugiat ex. Donec id lacus et tortor accumsan sollicitudin in sit amet tellus.
Proin lacinia placerat elit at pretium. Donec efficitur tortor id ex placerat, eget malesuada dolor egestas. Nullam bibendum mollis lacus nec condimentum. Morbi lacinia eget nisl sit amet laoreet. Duis consequat mattis nisl, at luctus eros porttitor ut. Nullam bibendum enim vitae est lacinia, faucibus dapibus diam tempor. Duis nec arcu a mi mollis efficitur. Aliquam non laoreet quam. Vivamus ipsum nunc, semper ultricies nisi sit amet, pellentesque tincidunt enim. Donec ultricies urna congue orci dictum, sed elementum neque hendrerit. Cras vel tempus mauris, vitae consectetur magna. Morbi vel rutrum quam, sed blandit ligula.
Quisque commodo, enim et gravida venenatis, erat neque laoreet eros, sed sollicitudin justo ante malesuada magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce velit est, hendrerit sed orci ac, luctus eleifend quam. Nam a tincidunt urna, ut ultricies massa. Donec semper purus aliquam, venenatis magna eu, gravida nunc. Proin luctus pulvinar hendrerit. Proin lorem tellus, blandit blandit orci nec, euismod hendrerit velit. Sed aliquam lacus ac justo fermentum aliquam in quis ante.
In hac habitasse platea dictumst. Nullam non nunc metus. Sed vitae felis ligula. Nullam scelerisque placerat mauris in laoreet. Maecenas pulvinar, lectus sed maximus iaculis, dolor neque tempus metus, non commodo nibh nibh eleifend orci. Suspendisse potenti. Nam volutpat efficitur nisl, vel vestibulum ligula pulvinar sed. Maecenas id tellus non ipsum aliquam imperdiet. Aenean vulputate, ante nec egestas fermentum, lacus libero scelerisque risus, non maximus leo metus at lorem. Phasellus sodales lacinia arcu, id pretium urna mattis in. Aliquam at fringilla tortor. Quisque bibendum neque ac augue ultricies consequat. Duis massa elit, interdum at tincidunt a, fermentum et justo. Sed sit amet porta sem.
In aliquet euismod euismod. Donec lacinia id ligula quis mattis. Cras placerat tempus nulla, vitae auctor ex sodales ut. Fusce lorem diam, dapibus eu tempus nec, vestibulum eget eros. Nullam interdum tincidunt justo, egestas blandit mi venenatis eget. Etiam nec sem rutrum felis pharetra posuere. Fusce quis porttitor elit. Aliquam imperdiet est sed nibh egestas, commodo efficitur magna varius. Vivamus laoreet ex ac purus viverra rutrum. Fusce pharetra enim sed porttitor efficitur. Aliquam lobortis cursus vehicula. Nunc gravida libero sit amet convallis malesuada. Vestibulum sit amet nunc sit amet justo ullamcorper consectetur non sit amet arcu. Pellentesque suscipit metus a dignissim commodo. In hac habitasse platea dictumst.
Maecenas venenatis porta aliquam. Pellentesque sit amet leo dignissim, eleifend ex sit amet, efficitur massa. Nunc eu pellentesque sapien. Nam ac dui nibh. Integer quis sollicitudin quam. Donec elementum nisi sit amet magna sollicitudin fringilla. Pellentesque viverra nulla nec lectus volutpat sodales. Nam viverra molestie ante at venenatis. Cras nec sagittis purus, facilisis pretium est. Sed sapien ante, sagittis vel orci a, euismod rutrum nunc. Integer efficitur neque eu dictum condimentum. Donec quis ligula id metus bibendum vulputate sit amet vel augue. Integer placerat vitae metus dignissim varius. Nullam bibendum quam non consectetur ornare. Curabitur sed venenatis nunc.
Proin dui massa, gravida eget egestas et, hendrerit fermentum arcu. Nam a bibendum lacus, sed pharetra lacus. Sed quis velit mollis, fringilla tellus non, semper ex. Quisque sodales feugiat dui a ultricies. Proin mattis elementum ante, eget porta purus. Sed congue erat non quam congue facilisis. Suspendisse finibus urna dolor, id vestibulum quam interdum nec. Duis non tempor elit, sit amet aliquet nisi. Nam porttitor tempus felis, ultrices vestibulum diam. Aliquam mollis lectus in leo sagittis rhoncus. Praesent eu imperdiet elit, vel faucibus erat. In ac consequat purus. Nullam in maximus turpis.
Donec arcu orci, blandit sit amet libero in, tristique pellentesque purus. Duis ornare turpis lacus, sed interdum erat accumsan in. Nullam erat tellus, tincidunt eget ultrices ut, laoreet eget elit. Mauris velit ligula, egestas eu ligula non, pharetra feugiat urna. Aenean ut nisl mi. Aliquam erat volutpat. Nunc id laoreet tellus, id iaculis ipsum. Mauris facilisis sed risus nec scelerisque. Proin tellus arcu, congue in urna at, tristique porta orci. Nullam ut dolor in leo dapibus consectetur. Nam porta sem non est eleifend molestie. Nunc tempor massa nisl, et mollis orci congue quis. Donec mollis, quam quis gravida iaculis, nunc diam consectetur felis, eu tristique lorem eros rutrum elit. Etiam nec dolor pellentesque, faucibus mauris nec, blandit est.
Quisque dignissim risus quis diam dignissim condimentum. Suspendisse nec sapien non lacus pellentesque feugiat. Praesent sodales sem sapien, quis viverra nisl viverra vitae. Fusce a ligula hendrerit, consequat odio sit amet, bibendum neque. Maecenas erat augue, tincidunt eget rutrum id, tristique ut turpis. Curabitur cursus sagittis mi et mollis. Maecenas faucibus gravida quam, dictum sagittis quam fermentum nec. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In quis nibh erat. Curabitur efficitur facilisis facilisis. Sed dictum id nisl vitae consequat.
In volutpat erat vel eros hendrerit rutrum. Phasellus posuere a urna at feugiat. Duis nec lacus ut magna hendrerit finibus. Maecenas varius pellentesque est, ornare pulvinar augue ultricies sed. Morbi lacinia efficitur sem et cursus. Curabitur id fermentum erat. Sed vehicula euismod tortor, sed mollis arcu vestibulum in. Mauris ante mi, convallis egestas justo eget, placerat pellentesque justo. Sed tincidunt dapibus feugiat. Vivamus a urna tristique, imperdiet quam iaculis, feugiat erat. Mauris quis orci et eros tincidunt ultricies. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer pretium interdum tellus, vel dictum mauris venenatis id.
Nam at augue ut risus luctus tempus. Nam facilisis posuere consectetur. Curabitur neque augue, ultrices ut imperdiet a, gravida at tellus. Aenean lorem elit, finibus non est pellentesque, dictum maximus purus. In luctus venenatis convallis. Fusce nunc velit, vehicula sit amet ex vitae, interdum ornare nisl. Vestibulum quis ipsum non urna bibendum finibus. Sed cursus, libero eget bibendum tristique, purus elit fringilla magna, eu faucibus lorem ipsum at sem. Maecenas sed arcu quam.
Sed non ultricies magna. Nunc eget commodo risus. Nullam eu nibh elit. Nunc tempus mauris eget ante hendrerit malesuada. Quisque nec est vitae arcu rutrum convallis ac sit amet ligula. Quisque eget efficitur neque. Sed consectetur auctor fringilla. Nullam ultrices ornare ante id posuere.`;
