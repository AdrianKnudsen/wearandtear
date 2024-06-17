import React from "react";
import client from "@/sanity";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity";

import styles from "@/styles/Deals.module.css";

async function getData() {
  const mensClothingItems = await client.fetch(
    `*[_type == "mensClothingItem"]{_id, name, image, slug, price, originalPrice, "type": "men"}`
  );
  const womensClothingItems = await client.fetch(
    `*[_type == "womensClothingItem"]{_id, name, image, slug, price, originalPrice, "type": "women"}`
  );

  return [...mensClothingItems, ...womensClothingItems];
}

export default async function Deals() {
  const items = await getData();
  return (
    <>
      <div className={styles.dealsComp}>
        <h2 className={styles.h2}>Best Deals</h2>
        <div className={styles.carousel}>
          {items.map((item) => (
            <li key={item._id} className={styles.item}>
              <Link
                href={`/${item.type}/${item.slug?.current || item.id}`}
                className={styles.link}
              >
                <div className={styles.imgBox}>
                  <Image
                    src={urlFor(item.image)
                      .width(400)
                      .height(400)
                      .fit("crop")
                      .url()}
                    alt={item.name}
                    width={100}
                    height={100}
                    className={styles.image}
                    priority
                  />
                </div>
              </Link>
              <div className={styles.textBox}>
                <h3 className={styles.h3}>{item.name}</h3>
                <div className={styles.priceBox}>
                  <p className={styles.originalPrice}>${item.originalPrice}</p>
                  <p className={styles.price}>${item.price}</p>
                </div>
              </div>
            </li>
          ))}
        </div>
        <button className={styles.btn}>View All</button>
      </div>
    </>
  );
}
