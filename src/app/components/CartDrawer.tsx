import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store";
import Image from "next/image";

export default function CartDrawer() {
    const useCart = useCartStore();


    return(
        <>
            {
                !useCart.isOpen && (
                    <div 
                        className="fixed w-full h-screen bg-black/50 top-0 left-0 z-50"
                        onClick={() => useCart.toggleCart()}
                    >
                        <div 
                            className="absolute bg-slate-600 right-0 top-0 h-full w-1/3 p-12 overflow-y-scroll max-md:w-2/3 max-md:p-5"
                            onClick={(e)=> e.stopPropagation()}    
                        >
                            <button className="mb-2 text-emerald-500 font-bold hover:scale-95 text-lg" onClick={() => useCart.toggleCart()}>X</button>
                            <hr className="my-2" />
                            <h1 className="mb-4 text-3xl font-bold text-left text-teal-600">Meu Carrinho</h1>
                            {
                                useCart.cart.map((product) => (
                                    <div className="flex flex-col gap-3 justify-between border rounded-lg my-2 p-2 max-lg:items-center max-lg:text-center max-lg:gap-2" key={product.id}>
                                        <div className="flex justify-between items-start max-lg:items-center max-lg:flex-col">
                                            <div className="gap-2">
                                                <p>{product.name}</p>
                                                
                                                <p className="flex items-center gap-1">Quantidade: {product.quantity}</p>
                                                <p className="text-emerald-400">{formatPrice(product.price)}</p>
                                            </div>
                                            <div className="max-lg:order-first">
                                                <Image src={product.image} alt={product.name} width={150} height={300} />
                                            </div>
                                        </div>
                                        <div className="flex gap-2 justify-center max-md:flex-col ">
                                            <button className="rounded-md w-1/2 bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center max-lg:w-full" onClick={() => useCart.addToCart(product)} >Adicionar +</button>
                                            <button className="gap-1 flex items-center justify-center rounded-md w-1/2 bg-red-500 text-white px-3.5 max-lg:w-full py-2.5 text-sm text-center" onClick={() => useCart.removeFromCart(product.id)}>Remover<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg></button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}