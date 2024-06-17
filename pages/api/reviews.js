// pages/api/reviews.js
import client from "@/sanity";

export default async function handler(req, res) {
  const { itemId } = req.query;

  if (req.method === "GET") {
    try {
      const reviews = await client.fetch(
        `*[_type == "review" && item._ref == $itemId] | order(date desc)`,
        { itemId }
      );
      res.status(200).json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch reviews", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
