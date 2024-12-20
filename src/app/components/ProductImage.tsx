"use client";
import { ProductType } from "@/types/ProductType";
import Image from "next/image";
import { JSX, useState } from "react";

type ProductProps ={
    product: ProductType;
    fill?: boolean;
}

export default function ProductImage({ product, fill }: ProductProps): JSX.Element {
    const [loading, setLoading] = useState(true);

    return fill ?(
        <Image 
            src={product.image}
            fill
            alt={product.name}
            className={`object-cover ${loading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100"}`}
            onLoadingComplete={() => setLoading(false)}
        />
    ) : (
        <Image 
            src={product.image}
            width={400}
            height={900}
            alt={product.name}
            className={`object-cover ${loading ? "grayscale blur-2xl scale-110" : "grayscale-0 blur-0 scale-100"}`}
            onLoadingComplete={() => setLoading(false)}
        />
    )
}