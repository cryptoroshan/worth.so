import {
  Carousel
} from "@material-tailwind/react";

import getStripe from "@/utils/get-stripejs";
import { SERVER_API_URL } from "@/utils/api-config";

export async function getServerSideProps(context) {
  const response = await fetch(`${SERVER_API_URL}/product/get_product_detail?id=${context.params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
  const res = await response.json();
  const product = res.product;

  if (product === null) {
    return {
      notFound: true,
    }
  }

  return { props: { product } }
}

export default function Page({ product }) {
  const handleCheckoutSession = async (priceId, productId) => {
    const response = await fetch('/api/stripe/checkout_sessions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price_id: priceId,
        product_id: productId
      })
    });
    const res = await response.json();

    // Redirect to Checkout.
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: res.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
  }

  return (
    <div className='flex flex-col gap-16'>
      <div className='flex gap-4 px-12 py-8 justify-between text-black border-b-2'>
        <div className='flex gap-4'>
          <img className='rounded-full w-16 h-16' src={product.image_list[0]} alt={product.app_name} />
          <div className='flex flex-col gap-12'>
            <div className='flex flex-col gap-2'>
              <p className='text-2xl font-semibold'>{product.app_name}</p>
              <p className='text-base'>${product.app_now_price} | {product.app_users}+ users</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={() => handleCheckoutSession(product.stripe_price_id, product._id)}
        >
          Buy Product
        </button>
      </div>
      <div className="w-full mx-auto">
        <Carousel loop className="mx-auto w-1/2 rounded-xl">
          {product.image_list !== null && (
            product.image_list.map((item, index) => {
              if (index >= 2) {
                return (
                  <img
                    key={index}
                    src={item}
                    alt=""
                    className="object-cover"
                  />
                )
              }
            })
          )}
        </Carousel>
      </div>
      <div className="flex flex-col gap-4">
        <p className='text-2xl font-semibold'>Overview</p>
        <p className="text-base">{product.app_overview}</p>
      </div>
    </div>
  )
}