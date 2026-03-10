import client from '@/sanity'

const LIST_FIELDS = '_id, name, description, image, slug'
const DETAIL_FIELDS = '_id, name, description, price, originalPrice, discount, image, features'

async function fetchBySlug(type, slug) {
  if (!slug) return null
  return client.fetch(
    `*[_type == $type && slug.current == $slug][0]{${DETAIL_FIELDS}}`,
    { type, slug },
  )
}

export async function fetchMensClothingItems() {
  return client.fetch(`*[_type == "mensClothingItem"]{${LIST_FIELDS}}`)
}

export async function fetchMensClothingItemBySlug(slug) {
  return fetchBySlug('mensClothingItem', slug)
}

export async function fetchWomensClothingItems() {
  return client.fetch(`*[_type == "womensClothingItem"]{${LIST_FIELDS}}`)
}

export async function fetchWomensClothingItemBySlug(slug) {
  return fetchBySlug('womensClothingItem', slug)
}
