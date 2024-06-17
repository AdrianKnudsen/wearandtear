'use client'

import React, { useContext } from 'react'
import { CartContext } from '../../contexts/CartContext'
import Cart from '@/components/Cart'
import styles from '@/styles/Cart.module.css'

const CartPage = () => {
  const { cartItems } = useContext(CartContext)

  return (
    <>
      <div className={styles.container}>
        <Cart items={cartItems} />
      </div>
    </>
  )
}

export default CartPage
