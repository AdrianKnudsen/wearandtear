'use client'

import React, { useState, useContext } from 'react'
import Image from 'next/image'
import styles from '@/styles/ProductItem.module.css'
import { urlFor } from '@/sanity'
import { CartContext } from '../contexts/CartContext'

const ProductItem = ({ item, reviews }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('S')
  const { addToCart } = useContext(CartContext)

  if (!item) return null

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10)
    if (value > 0) {
      setQuantity(value)
    }
  }

  const handleSizeChange = (size) => {
    setSelectedSize(size)
  }

  const handleAddToCart = () => {
    addToCart({ ...item, quantity, selectedSize })
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    return totalRating / reviews.length
  }

  const averageRating = calculateAverageRating()

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {item.image && (
          <Image
            src={urlFor(item.image).width(500).url()}
            alt={item.name}
            width={500}
            height={500}
            className={styles.mainImage}
            priority
          />
        )}
      </div>
      <div className={styles.detailsContainer}>
        <h1 className={styles.title}>{item.name}</h1>
        <div className={styles.rating}>
          <div className={styles.stars}>
            {'★'.repeat(Math.round(averageRating))}
            {'☆'.repeat(5 - Math.round(averageRating))}
          </div>
          <span className={styles.reviewCount}>{reviews.length} reviews</span>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.currentPrice}>${item.price}</span>
          {item.originalPrice && (
            <>
              <span className={styles.originalPrice}>
                ${item.originalPrice}
              </span>
              <span className={styles.discount}>{item.discount}</span>
            </>
          )}
        </div>
        <div className={styles.features}>
          <h2>Features</h2>
          <ul>
            {item.features?.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div className={styles.sizeSelection}>
          <h2>Select Size</h2>
          <div className={styles.sizeOptions}>
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                className={`${styles.sizeOption} ${
                  selectedSize === size ? styles.selected : ''
                }`}
                onClick={() => handleSizeChange(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.quantitySelection}>
          <h2>Select Quantity</h2>
          <div className={styles.quantityControls}>
            <button
              className={styles.quantityButton}
              onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              min="1"
              className={styles.quantityInput}
              onChange={handleQuantityChange}
            />
            <button
              className={styles.quantityButton2}
              onClick={() => setQuantity((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>
        <button className={styles.addToCartButton} onClick={handleAddToCart}>
          Add to cart
        </button>
      </div>
    </div>
  )
}

export default ProductItem
