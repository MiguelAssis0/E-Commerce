'use client'
import { useCallback, useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ProductType } from "@/types/ProductType"
import Product from "./Product"
import { fetchProducts } from "../actions"

export default function InfiniteScroll({
    initialProducts
} : {
    initialProducts: ProductType[]
}){
    const [products, setProducts] = useState<ProductType[]>(initialProducts)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [ref, inView] = useInView({
        threshold: 0,
        triggerOnce: false
    })

    const  loadMoreProducts = useCallback(async () => {
        setIsLoading(true)
        const { formatedProducts, has_more } = await fetchProducts({ lastProductId: products[products.length - 1].id })
        if(formatedProducts){
            setProducts((prevProducts)=> [...prevProducts, ...formatedProducts])
            setHasMore(has_more)
        }
        setIsLoading(false)
    }, [products])


    useEffect(() => {
        if(inView && hasMore && !isLoading)
            loadMoreProducts()
    },[hasMore, inView, isLoading, loadMoreProducts])

    if(!products){
        return <div>Carregando...</div>
    }

    return (
        <>
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
            {hasMore && <div ref={ref}>Carregando...</div>}
        </>
    )
}