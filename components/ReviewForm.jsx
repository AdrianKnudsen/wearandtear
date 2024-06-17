"use client";

import React, { useState, useRef } from "react";
import client from "@/sanity";
import styles from "@/styles/ReviewForm.module.css";

const ReviewForm = ({ itemId, setReviews }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/submitReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message, rating, itemId }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const createdReview = await response.json();
      console.log("Created review:", createdReview);

      // Reset form fields
      setName("");
      setMessage("");
      setRating(5);

      // Fetch updated reviews
      const updatedReviews = await client.fetch(
        `*[_type == "review" && item._ref == $itemId] | order(date desc)`,
        { itemId }
      );
      setReviews(updatedReviews);

      // Hide the form after submission
      setFormVisible(false);
    } catch (error) {
      setError("Failed to submit review. Please try again.");
      console.error(error);
    }
  };

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
    if (!formVisible) {
      setTimeout(() => {
        formRef.current.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };

  const starRatings = ["★", "★★", "★★★", "★★★★", "★★★★★"];

  return (
    <div className={styles.formComp}>
      <button className={styles.button} onClick={toggleFormVisibility}>
        {formVisible ? "Cancel" : "Submit Review"}
      </button>
      {formVisible && (
        <form ref={formRef} onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name:
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Message:
            <textarea
              maxLength="200"
              className={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <label className={styles.label}>
            Rating:
            <select
              className={styles.select}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {starRatings.map((star, index) => (
                <option key={index} value={index + 1}>
                  {star}
                </option>
              ))}
            </select>
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.button} type="submit">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
