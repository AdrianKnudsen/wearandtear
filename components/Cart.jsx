import React, { useContext } from "react";
import Image from "next/image";
import { CartContext } from "@/contexts/CartContext";
import { urlFor } from "@/sanity";
import styles from "@/styles/Cart.module.css";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.cart}>
        <h1 className={styles.title}>My Cart</h1>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCartMessage}>
            <p>
              It&apos;s so empty in here... Are you sure you don&apos;t need
              anything?
            </p>
          </div>
        ) : (
          <ul className={styles.items}>
            {cartItems.map((item) => (
              <li key={item._id} className={styles.item}>
                <Image
                  src={urlFor(item.image)
                    .width(100)
                    .height(100)
                    .fit("crop")
                    .url()}
                  alt={item.name}
                  width={100}
                  height={100}
                  className={styles.itemImage}
                />
                <div className={styles.itemText}>
                  <p className={styles.itemName}>{item.name}</p>
                  <p className={styles.itemSize}>Size: {item.selectedSize}</p>
                </div>
                <div className={styles.itemDetails}>
                  <div className={styles.quantityContainer}>
                    <button
                      className={styles.quantityButton}
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <div className={styles.quantity}>{item.quantity}</div>
                    <button
                      className={styles.quantityButton2}
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className={styles.itemPrice}>
                    ${item.price.toFixed(2)}
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => removeFromCart(item._id)}
                  >
                    <Image
                      src="/svg/trash.svg"
                      alt="Delete icon"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.totalBox}>
        <div className={styles.total}>
          <strong>Subtotal:</strong>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <p className={styles.finalPriceNote}>
          Final price will be calculated on the Checkout screen
        </p>
        <button className={styles.checkoutButton}>Continue to payment</button>
        <button className={styles.backButton}>Back to shop</button>
      </div>
    </div>
  );
};

export default Cart;
