import { Jwt } from "jsonwebtoken";

import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("worth-so");
  switch (req.method) {
    case "POST":
      let bodyObject = req.body;
      const accountInfo = await db.collection("account").findOne({ name: bodyObject.user_info.name });
      if (accountInfo === null) {
        const response = await db.collection("account").insertOne(bodyObject.user_info);
        res.json({ status: response.acknowledged });
      } else {
        res.json({ status: true });
      }
      break;
    // case "GET":
    //   const allPosts = await db.collection("account").find({}).toArray();
    // console.log(process.env.JWT_TOKEN_KEY)
    //     const jwt_token = Jwt.sign(bodyObject.user_info, )

    //   res.json({ status: 200, data: allPosts });
    //   break;
  }
}