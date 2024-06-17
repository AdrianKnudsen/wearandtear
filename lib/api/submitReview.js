import client from "@/sanity";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, message, rating, itemId } = req.body;

    try {
      const newReview = {
        _type: "review",
        name,
        message,
        rating,
        date: new Date().toISOString(),
        item: { _type: "reference", _ref: itemId },
      };

      const createdReview = await client.create(newReview);

      res.status(201).json(createdReview);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit review", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
