import { API_BASE_URL } from '@/utils/api';
import 'material-symbols';
import { Metadata } from 'next';
import ProductPageContent from './components/productPageContent';

interface ProductDetailPageProps {
  params: { productId: string };
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const productId = params.productId;
  const res = await fetch(`${API_BASE_URL}/products/${productId}`);

  if (res.status !== 200) {
    return {
      title: '상품 상세 정보 - Weardrobe',
    };
  }

  const product = (await res.json()) as ProductInfoResponse;

  return {
    title: `${product.name} - Weardrobe`,
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductPageContent productIdStr={params.productId} />;
}
