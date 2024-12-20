import { stripe } from "@/lib/stripe";
import { ProductType } from "@/types/ProductType";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const calculateOrderAmount = (items: ProductType[]) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return totalPrice; 
}

export async function POST(req: Request) {
    const { userId } = await auth();
    const { items, payment_intent_id } = await req.json();

    if (!userId) 
        return new Response("Transação não autorizada", { status: 401 });
    
    const customerId = await stripe.customers.create({
        email: userId,
        name: userId,
    });

    const total = calculateOrderAmount(items);

    const order = {
        user: { connect: { id: 1 } },
        amount: total,
        currency: "BRL",	
        status: "pending",
        paymentIntentID: payment_intent_id,
        products: {
            create: items.map((item: ProductType) => ({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            })),
        }
    }

    if(payment_intent_id) {
        const currentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
        if(currentIntent){
            const updatedIntent = await stripe.paymentIntents.update(payment_intent_id, {
                amount: calculateOrderAmount(items),
            })

            const [existingOrder, updatedOrder] =  await Promise.all([
                prisma.order.findFirest({
                    where:{
                        paymentIntentId: payment_intent_id
                    },
                    include:{
                        products: true
                    }
                }),
                prisma.order.update({
                    where:{
                        paymentIntentId: payment_intent_id
                    },
                    data:{
                        amount: total,
                        products:{
                            deleteMany: {},
                            create: items.map((item: ProductType) => ({
                                name: item.name,
                                description: item.description,
                                quantity: item.quantity,
                                price: item.price,
                                image: item.image
                            })),
                        }
                    }
                })
            ]);

            if(!existingOrder){
                return new Response("Order not found", { status: 404 });
            }

            return Response.json({ paymentIntent: updatedIntent }, { status: 200 });
        }
    }else{
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items),
            currency: "BRL",
            automatic_payment_methods: {
                enabled: true,
            }
        });

        order.paymentIntentID = paymentIntent.id

        const newOrder = await prisma.order.create({ 
            data: order 
        });
    
        return Response.json({ paymentIntent }, { status: 200 });
    }

}