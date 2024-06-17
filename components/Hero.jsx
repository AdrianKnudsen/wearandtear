import React from 'react'
import styles from '@/styles/Hero.module.css'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.textBox}>
        <h3 className={styles.h3}>With an outstanding style, only for you</h3>
        <h1 className={styles.h1}>Exclusively designed for you</h1>
      </div>
      <Image
        className={styles.heroimg}
        src="/images/backgroundImage.png"
        alt="hero-img"
        fill={true}
        sizes="(max-width: 1920px) 100vw, 1920px"
        priority
      />
      <div className={styles.imgBox}>
        <div className={styles.imageContainer}>
          <Image
            className={styles.forHerImg}
            src="/images/forHerImg.png"
            alt="image of a lady"
            fill={true}
            sizes="(max-width: 1920px)"
            priority // Adding priority to the Image component
          />
          <button className={styles.forHerBtn}>For Her</button>
        </div>
        <div className={styles.imageContainer}>
          <Image
            className={styles.forHimImg}
            src="/images/forHimImg.png"
            alt="image of a guy"
            fill={true}
            sizes="(max-width: 1920px)"
            priority // Adding priority to the Image component
          />
          <button className={styles.forHimBtn}>For Him</button>
        </div>
      </div>
    </div>
  )
}
