import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("worth-so");
  switch (req.method) {
    case "GET":
      const allProduct = await db.collection("product").find({}).toArray();
      res.json({ status: true, data: allProduct });
      break;
  }
}