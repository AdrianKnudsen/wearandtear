import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { fetchMensClothingItems } from '@/lib/clothingLogic'
import { urlFor } from '../../sanity'
import styles from '@/styles/Men.module.css'

export const revalidate = 10

export default async function Men() {
  const items = await fetchMensClothingItems()

  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>Explore Our Men&apos;s Collection</h1>
        <ul className={styles.grid}>
          {items.map((item) => {
            const imageUrl =
              urlFor(item.image)?.width(400).url() || '/fallback-image.jpg'
            return (
              <li key={item._id} className={styles.item}>
                <Link
                  href={`/men/${item.slug?.current || item._id}`}
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
