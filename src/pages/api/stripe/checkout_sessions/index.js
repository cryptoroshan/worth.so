const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let bodyObject = req.body;

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: bodyObject.price_id,
            quantity: 1
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}&product_id=${bodyObject.product_id}`,
        cancel_url: `${req.headers.origin}/product/${bodyObject.product_id}`,
      });
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}