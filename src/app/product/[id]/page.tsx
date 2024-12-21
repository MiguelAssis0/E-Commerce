import AddCart from "@/app/components/AddCart"
import ProductImage from "@/app/components/ProductImage"
import { formatPrice } from "@/lib/utils"
import Stripe from "stripe"
import { Metadata } from "next"

interface Product {
    id: string;
    name: string;
    price: number | null;
    image: string;
    description: string | null;
    currency: string;
}

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getProduct(id: string): Promise<Product> {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: "2024-12-18.acacia"})
    const produto = await stripe.products.retrieve(id)
    const price = await stripe.prices.retrieve(produto.default_price as string)

    return {
        id: produto.id,
        name: produto.name,
        price: price.unit_amount,
        image: produto.images[0],
        description: produto.description,
        currency: price.currency
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);
    
    return {
        title: product.name,
        description: product.description,
    }
}

export default async function ProductPage({ params }: PageProps) {
    const resolvedParams = await params;
    const product = await getProduct(resolvedParams.id);

    return (
        <div className="flex gap-10 justify-center h-full bg-gray-50 absolute w-full top-15 left-0 max-md:flex-col max-md:items-center max-md:gap-2">
            <div className="w-1/2 h-96 flex justify-center my-8 p-2 border bg-white border-gray-200 rounded-3xl max-md:w-11/12">
                <ProductImage product={product}/>
            </div>
            <div className="flex flex-col gap-4 my-8 text-white max-md:my-0">
                <div className="pb-4 flex flex-col gap-1 items-start max-md:pb-1">
                    <h1 className="text-3xl font-bold text-center text-gray-800">{product.name}</h1>
                    <h2 className="text-2xl font-bold text-center text-teal-600">{formatPrice(product.price!)}</h2>
                </div>
                <div className="pb-4"><p className="text-2xl font-bold text-center text-gray-600">{product.description}</p></div>
                <div className="flex gap-2 items-center">
                    <p className="text-md text-center text-black">Adicionar ao Carrinho</p>
                    <AddCart product={product}/>
                </div>
            </div>
        </div>
    )
}