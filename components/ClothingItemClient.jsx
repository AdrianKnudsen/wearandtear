'use client'

import React, { useState, useEffect } from 'react'
import client from '@/sanity'
import ProductItem from '@/components/ProductItem'
import Reviews from '@/components/Reviews'
import ReviewForm from '@/components/ReviewForm'

const ClothingItemClient = ({ item }) => {
  const [reviews, setReviews] = useState([])
  const [error, setError] = useState(null)

  // Fetch reviews data
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsData = await client.fetch(
          `*[_type == "review" && item._ref == $itemId] | order(date desc)`,
          { itemId: item._id },
        )
        setReviews(reviewsData)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch reviews data')
      }
    }

    fetchReviews()
  }, [item._id])

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <ProductItem item={item} reviews={reviews} />
      <Reviews itemId={item._id} />
      <ReviewForm itemId={item._id} setReviews={setReviews} />
    </>
  )
}

export default ClothingItemClient
