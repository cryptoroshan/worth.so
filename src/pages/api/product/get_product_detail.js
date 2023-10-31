import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("worth-so");
  switch (req.method) {
    case "GET":
      const product = await db.collection("product").findOne({ _id: new ObjectId(req.query.id) });
      res.json({ product });
      break;
  }
}