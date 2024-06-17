import { urlFor } from '@/sanity'
import client from '@/sanity'
import styles from '@/styles/Collection.module.css'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 10

async function getData() {
  const mensClothingItems = await client.fetch(
    `*[_type == "mensClothingItem"]{_id, name, image, slug, price, description, "type": "men"}`,
  )
  const womensClothingItems = await client.fetch(
    `*[_type == "womensClothingItem"]{_id, name, image, slug, price, description, "type": "women"}`,
  )

  return [...mensClothingItems, ...womensClothingItems]
}

export default async function Collection() {
  const items = await getData()
  return (
    <>
      <section className={styles.collectionPage}>
        <h1 className={styles.h1}>Explore Our Collection</h1>
        <ul className={styles.items}>
          {items.map((item) => (
            <li key={item._id} className={styles.item}>
              <Link
                href={`/${item.type}/${item.slug?.current || item._id}`}
                className={styles.link}
              >
                <div className={styles.imgBox}>
                  <Image
                    src={urlFor(item.image)
                      .width(400)
                      .height(400)
                      .fit('crop')
                      .url()}
                    alt={item.name}
                    width={100}
                    height={100}
                    className={styles.image}
                    priority
                  />
                </div>
                <h2 className={styles.h2}>{item.name}</h2>
              </Link>
              <p className={styles.p}>{item.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
