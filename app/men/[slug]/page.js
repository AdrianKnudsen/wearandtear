import React from 'react'
import {
  fetchMensClothingItems,
  fetchMensClothingItemBySlug,
} from '@/lib/clothingLogic'
import ClothingItemClient from '@/components/ClothingItemClient'

export async function generateStaticParams() {
  const items = await fetchMensClothingItems()
  return items
    .filter((item) => item.slug && item.slug.current)
    .map((item) => ({ slug: item.slug.current }))
}

const ClothingItem = async ({ params }) => {
  const { slug } = params
  const item = await fetchMensClothingItemBySlug(slug)

  if (!item) {
    return <div>Item not found</div>
  }

  return <ClothingItemClient item={item} />
}

export default ClothingItem
