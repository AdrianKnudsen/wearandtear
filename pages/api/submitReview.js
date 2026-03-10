import { submitReview } from '@/lib/reviewHandler'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { name, message, rating, itemId } = req.body

  try {
    const review = await submitReview({ name, message, rating, itemId })
    res.status(201).json(review)
  } catch (error) {
    console.error('Error submitting review:', error)
    res.status(500).json({ message: 'Failed to submit review', error: error.message })
  }
}
