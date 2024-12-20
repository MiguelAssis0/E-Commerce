'use server'
import { stripe } from "@/lib/stripe";

type fetchProductsProps = {
    lastProductId?: string | undefined
}

export async function fetchProducts({ lastProductId }: fetchProductsProps){
  const params = lastProductId ? {
    starting_after: lastProductId,
    limit: 12} : { limit: 12 }
  const { data: products, has_more } = await stripe.products.list(params);
  const formatedProducts = await Promise.all(
    products.map(async (product) => {
      const price = await stripe.prices.retrieve(product.default_price as string)
      return {
        id: product.id,
        name: product.name,
        price: price.unit_amount,
        image: product.images[0],
        description: product.description,
        currency: price.currency
      }
    })
  )

  return { formatedProducts, has_more }
}
