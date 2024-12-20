'use client';
import { useCartStore } from "@/store";
import { useEffect } from "react";

export default function Checkout() {
    const cartStore = useCartStore();

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        items: cartStore.cart,
                        payment_intent_id: cartStore.paymentIntentId,
                    }),
                });
    
                if (!response.ok) {
                    throw new Error('Falha no pagamento');
                }
    
                const data = await response.json();
                console.log('Payment intent:', data.paymentIntentId);

            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        };
    
        createPaymentIntent();
    }, [cartStore.cart, cartStore.paymentIntentId]);

    return (
        <>
            
        </>
    );
}