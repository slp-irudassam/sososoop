import Link from 'next/link';
import { getPurchasable } from '@/lib/products';
import CheckoutClient from './CheckoutClient';

export const revalidate = 60;

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: pid } = await searchParams;
  const product = await getPurchasable(pid);

  if (!product) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-[17px] font-semibold text-ink">상품을 찾을 수 없어요.</p>
        <Link href="/resources" className="text-primary underline text-[14px]">
          자료실로 돌아가기
        </Link>
      </main>
    );
  }

  return <CheckoutClient product={product} />;
}
