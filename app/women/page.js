import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchWomensClothingItems } from '@/lib/clothingLogic'
import { urlFor } from '@/sanity'
import styles from '@/styles/men.module.css'

export const revalidate = 10

export default async function Women() {
  const items = await fetchWomensClothingItems()

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>Explore Our Women&apos;s Collection</h1>
        <ul className={styles.grid}>
          {items.map((item) => {
            const imageUrl =
              urlFor(item.image)?.width(400).url() || '/fallback-image.jpg'
            return (
              <li key={item._id} className={styles.item}>
                <Link
                  href={`/women/${item.slug?.current || item._id}`}
                  className={styles.link}
                >
                  <div className={styles.imgBox}>
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      width={400}
                      height={400}
                      className={styles.image}
                      priority
                    />
                  </div>
                  <h2 className={styles.h2}>{item.name}</h2>
                </Link>
                <p className={styles.p}>{item.description}</p>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}
