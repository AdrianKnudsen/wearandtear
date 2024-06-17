import { submitReview } from "@/lib/reviewHandler";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const review = await submitReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to submit review", error });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
