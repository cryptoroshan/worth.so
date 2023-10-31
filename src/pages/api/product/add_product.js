import clientPromise from "@/lib/mongodb";
import { IncomingForm } from "formidable";
import fs from "fs";
import mv from "mv";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("worth-so");
  switch (req.method) {
    case "POST":
      await new Promise((resolve, reject) => {
        const form = new IncomingForm()

        form.parse(req, async (err, fields, files) => {
          const appManager = fields.app_manager[0];
          const appName = fields.app_name[0];
          const appURL = fields.app_url[0];
          const appStartingPrice = fields.app_starting_price[0];
          const amountIncrease = fields.amount_increase[0];
          const numberOfSales = fields.sales_number[0];
          const appOverview = fields.app_overview[0];

          // create directory
          try {
            fs.mkdirSync(`./public/product/${appName}`);
          } catch (err) {
            console.log(err)
          }

          // upload images
          let imageList = [];

          // save files
          const values = Object.values(files);

          values.map(async (value) => {
            const appIntroductionImageOldPath = value[0].filepath;
            const appIntroductionImageNewPath = `./public/product/${appName}/${value[0].newFilename}${value[0].originalFilename}`;
            mv(appIntroductionImageOldPath, appIntroductionImageNewPath, function (err) {
            });
            imageList.push(`/product/${appName}/${value[0].newFilename}${value[0].originalFilename}`);
          })

          if (err) return reject(err)

          // stripe
          const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

          const product = await createProduct(stripe, appName, `${req.headers.origin}${imageList[0]}`);
          const price = await createPrice(stripe, appStartingPrice, product.id);

          const insertData = {
            app_manager: appManager,
            app_name: appName,
            app_url: appURL,
            app_starting_price: Number(appStartingPrice),
            app_now_price: Number(appStartingPrice),
            amount_increase: Number(amountIncrease),
            sales_number: Number(numberOfSales),
            current_sales: 0,
            app_overview: appOverview,
            app_users: 0,
            image_list: imageList,
            stripe_product_id: product.id,
            stripe_price_id: price.id
          };

          const response = await db.collection("product").insertOne(insertData);

          res.json({ status: response.acknowledged });
        })
      })
      break;
  }
}

// create a product in stripe
const createProduct = async (stripe, appName, imageUrl) => {
  const product = await stripe.products.create({
    name: appName,
    images: [imageUrl]
  });

  return product;
}

// create a price in stripe
const createPrice = async (stripe, appStartingPrice, productId) => {
  const price = await stripe.prices.create({
    unit_amount: appStartingPrice*100,
    currency: 'usd',
    product: productId
  });

  return price;
}

export const config = {
  api: {
    bodyParser: false,
  },
};