import { useCartStore } from "@/store";
import { formatPrice } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CheckoutButtonProps = {
    totalPrice: number
}

export default function CheckoutButton({ totalPrice }: CheckoutButtonProps) {
    const router = useRouter();
    const useCart = useCartStore();
    const { user } = useUser();

    const handleCheckout = async () => {
        if (!user) {
            useCart.toggleCart();
            router.push(`/sign-in?redirect_url=/`);
            return;
        }
        useCart.setCheckout('checkout');
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <p className="text-xl font-bold text-teal-600">Total</p>
                <p className="text-xl font-bold text-teal-600">{formatPrice(totalPrice)}</p>
            </div>
            <button className="rounded-md w-full bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center" onClick={handleCheckout}>Finalizar Compra</button>
        </div>
    )
}