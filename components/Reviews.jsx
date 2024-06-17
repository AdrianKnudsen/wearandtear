'use client'

import React, { useState, useEffect } from 'react'
import client from '@/sanity'
import styles from '@/styles/Reviews.module.css'

const Reviews = ({ itemId }) => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = await client.fetch(
        `*[_type == "review" && item._ref == $itemId] | order(date desc)`,
        { itemId },
      )
      setReviews(reviewsData)
    }

    fetchReviews()
  }, [itemId])

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return totalRating / reviews.length
  }

  const getStarBreakdown = () => {
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      breakdown[review.rating] += 1
    })
    return breakdown
  }

  const averageRating = calculateAverageRating()
  const starBreakdown = getStarBreakdown()

  return (
    <div className={styles.reviewsComp}>
      <h2>Customer Reviews</h2>
      <div className={styles.reviewSummary}>
        <div className={styles.averageRating}>
          <div className={styles.stars}>
            {'★'.repeat(Math.round(averageRating))}
            {'☆'.repeat(5 - Math.round(averageRating))}
          </div>
          <div className={styles.ratingValue}>{averageRating.toFixed(2)}</div>
          <div className={styles.ratingCount}>({reviews.length} reviews)</div>
        </div>
        <div className={styles.starBreakdown}>
          {Object.entries(starBreakdown).map(([stars, count]) => (
            <div key={stars} className={styles.starRow}>
              <div>{stars} stars</div>
              <div className={styles.starBar}>
                <div
                  className={styles.starFill}
                  style={{ width: `${(count / reviews.length) * 100}%` }}
                ></div>
              </div>
              <div>{count}</div>
            </div>
          ))}
        </div>
      </div>
      {reviews.map((review) => (
        <div key={review._id} className={styles.review}>
          <div className={styles.stars}>
            {'★'.repeat(review.rating)}
            {'☆'.repeat(5 - review.rating)}
          </div>
          <p className={styles.message}>{review.message}</p>
          <p className={styles.author}>{review.name}</p>
          <p className={styles.date}>
            {new Date(review.date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Reviews
