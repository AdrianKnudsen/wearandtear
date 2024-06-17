import client from '@/sanity'

export async function fetchMensClothingItems() {
  return await client.fetch(
    `*[_type == "mensClothingItem"]{_id, name, description, image, slug}`,
  )
}

export async function fetchMensClothingItemBySlug(slug) {
  if (!slug) return null
  return await client.fetch(
    `*[_type == "mensClothingItem" && slug.current == $slug][0]{
      _id,
      name,
      description,
      price,
      originalPrice,
      discount,
      image,
      features
    }`,
    { slug },
  )
}

export async function fetchWomensClothingItems() {
  return await client.fetch(
    `*[_type == "womensClothingItem"]{_id, name, description, image, slug}`,
  )
}

export async function fetchWomensClothingItemBySlug(slug) {
  if (!slug) return null
  return await client.fetch(
    `*[_type == "womensClothingItem" && slug.current == $slug][0]{
      _id,
      name,
      description,
      price,
      originalPrice,
      discount,
      image,
      features
    }`,
    { slug },
  )
}
