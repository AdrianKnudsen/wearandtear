import client from "@/sanity";

export async function submitReview({ name, message, rating, itemId }) {
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
    return createdReview;
  } catch (error) {
    console.error("Error in submitReview function:", error);
    throw error;
  }
}
