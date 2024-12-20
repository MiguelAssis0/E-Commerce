"use client";
import { useCartStore } from "@/store";
import { useEffect, useState } from "react";
import CartDrawer from "./CartDrawer";

export default function Cart() {
    const [quantity, setQuantity] = useState(0);
    const useCart = useCartStore();

    useEffect(() => {
        setQuantity(useCart.cart.reduce((acc, item) => acc + item.quantity!, 0));
    }, [useCart.cart]);

   
    

    return (
        <>
            <div 
                className="flex items-center cursor-pointer relative "
                onClick={() => useCart.toggleCart()}    
            >
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z" stroke="#ffffff" strokeWidth="1.5"></path> <path d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z" stroke="#ffffff" strokeWidth="1.5"></path> <path d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5" stroke="#ffffff" strokeWidth="1.5"></path> </g></svg>
                <span className="bg-teal-600 text-sm text-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">{quantity}</span>
            </div>
            
            <CartDrawer />
        </>
    )
}