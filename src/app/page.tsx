
import { ProductType } from "@/types/ProductType"
import Product from "./components/Product"
import Stripe from "stripe"

async function getProducts(): Promise<ProductType[]> {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: "2024-12-18.acacia"})
  const products = await stripe.products.list();
  const formatedProducts = await Promise.all(
    products.data.map(async (product: Stripe.Product) => {
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

  return formatedProducts
}

export default async function Home() {
  const products = await getProducts()


  return (
    <div className="max-w-7xl mx-auto pt-8 px-8 xl:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
          {products.map((product)=>(
            <Product key={product.id} product={product}/>
          ))}
        </div>
    </div>
  );
}
