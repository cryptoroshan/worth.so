import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("worth-so");
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      const product = await db.collection("product").findOne({ _id: new ObjectId(bodyObject.product_id) });
      if (product) {
        if (product.sales_number === product.current_sales + 1) {
          // stripe
          const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

          // update a price
          await archivePrice(stripe, product);
          const newPrice = await createNewPrice(stripe, product);

          const updatedProduct = await db.collection("product").updateOne(
            { _id: new ObjectId(bodyObject.product_id) },
            {
              $set: {
                app_now_price: product.app_now_price + product.amount_increase,
                current_sales: 0,
                app_users: product.app_users + 1,
                stripe_price_id: newPrice.id
              }
            }
          )
          res.status(200).json({ updatedProduct });
        } else {
          const updatedProduct = await db.collection("product").updateOne(
            { _id: new ObjectId(bodyObject.product_id) },
            {
              $set: {
                current_sales: product.current_sales + 1,
                app_users: product.app_users + 1
              }
            }
          )
          res.status(200).json({ updatedProduct });
        }
      }
      break;
  }
}

const archivePrice = async (stripe, product) => {
  await stripe.prices.update(
    product.stripe_price_id,
    { active: false }
  );
}

// create a new price in stripe
const createNewPrice = async (stripe, product) => {
  const price = await stripe.prices.create({
    unit_amount: (product.app_now_price + product.amount_increase) * 100,
    currency: 'usd',
    product: product.stripe_product_id
  });

  return price;
}