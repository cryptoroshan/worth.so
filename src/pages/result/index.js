import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { fetchGetJSON } from '@/utils/api-helpers';
import useSWR from 'swr';

const ResultPage = () => {
  const router = useRouter();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/api/stripe/checkout_sessions/${router.query.session_id}`
      : null,
    fetchGetJSON
  );

  useEffect(() => {
    if (data?.payment_intent?.status === "succeeded") {
      updateProduct();
    }
  }, [data?.payment_intent?.status])

  const updateProduct = async () => {
    const response = await fetch('/api/product/update_product', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: router.query.product_id
      })
    });
    const res = await response.json();
  }

  if (error) return <div>failed to load</div>;

  return (
    <div>
      <h1 className='mt-20 text-xl text-center'>Checkout Payment Result: {data?.payment_intent?.status ?? 'loading...'}</h1>
    </div>
  );
};

export default ResultPage;
