import { ProductType } from "@/types/ProductType";
import ProductImage from "./ProductImage";
import { formatPrice } from "@/lib/utils";
import AddCart from "./AddCart";
import Link from "next/link";

type ProductProps = { product: ProductType}

export default function Product({product} : ProductProps){

    return(
        <div className="flex flex-col shadow-lg h-96 bg-slate-800 p-5 text-gray-300 ">
            <div className="relative max-h-100 flex-1"><ProductImage product={product} fill/></div>
            <div className="flex justify-between font-bold my-3">
                <p className="w-40 truncate">
                    {product.name}
                </p>
                <p className="text-md text-teal-300">
                    {formatPrice(product.price!)}
                </p>
            </div>
            <div className="flex justify-between gap-2">
                <Link href={`/product/${product.id}`} className="rounded-md bg-teal-600 w-full text-white px-3.5 py-2.5 text-sm text-center">Ver detalhes</Link>
                <AddCart product={product}/>
            </div>
          
        </div>
    )
}