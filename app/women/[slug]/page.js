import React from 'react'
import {
  fetchWomensClothingItemBySlug,
  fetchWomensClothingItems,
} from '@/lib/clothingLogic'
import ClothingItemClient from '@/components/ClothingItemClient'

export async function generateStaticParams() {
  const items = await fetchWomensClothingItems()
  return items
    .filter((item) => item.slug && item.slug.current)
    .map((item) => ({ slug: item.slug.current }))
}

const ClothingItem = async ({ params }) => {
  const { slug } = params
  const item = await fetchWomensClothingItemBySlug(slug)

  if (!item) {
    return <div>Item not found</div>
  }

  return <ClothingItemClient item={item} />
}

export default ClothingItem
