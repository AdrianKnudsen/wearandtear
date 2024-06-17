import { submitReview } from "@/lib/reviewHandler";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const review = await submitReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      console.error("Error in submitReview API route:", error);
      res
        .status(500)
        .json({ message: "Failed to submit review", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
