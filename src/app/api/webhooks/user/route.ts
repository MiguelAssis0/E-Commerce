import prisma from "@/lib/prisma";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import Stripe from "stripe";

const webHookSecret = process.env.CLERK_WEBHOOK_SECRET || "";

type EventType = 'user.created' | 'user.updated' | '*';

type Event = {
    data: EventDataType;
    object: 'event';
    type: EventType;
};

type EventDataType = {
    id: string;
    first_name: string;
    last_name: string;
    email_address: EmailAddressType[];
    primary_email_address_id: string;
    attributes: Record<string, string | number>;
}

type EmailAddressType = {
    id: string;
    email_address: string;
}

async function handler(req: Request) {
    const payload = await req.json();
    const headersList = headers() as unknown as IncomingHttpHeaders;
    const heads = {
        'svix-id': headersList.get("svix-id"),
        'svix-timestamp': headersList.get("svix-timestamp"),
        'svix-signature': headersList.get("svix-signature")
    };
    const wh = new Webhook(webHookSecret);
    let evt: Event | null = null;

    try{
        evt = wh.verify(
            JSON.stringify(payload),
            heads as IncomingHttpHeaders & WebhookRequiredHeaders
        ) as Event;
    } catch(e){
        console.error(e);
        return NextResponse.json({message: "Invalid signature"}, {status: 400});
    }

    const eventType: EventType = evt.type;

    if(eventType == 'user.created' || eventType == 'user.updated'){
        const {
            id,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            first_name,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            last_name,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            email_address,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            primary_email_address_id,
            ...attributes
        } = evt.data;

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {apiVersion: "2024-12-18.acacia"})

        const customer = await stripe.customers.create({
            name: `${first_name} ${last_name}`,
            email: email_address? email_address[0].email_address : ''
        })

        await prisma.user.upsert({
            where: {
                externalId: id as string
            },
            update: {
                attributes
            },
            create: {
                externalId: id,
                stripeCustomerId: customer.id,
                attributes
            }
        });
    }

    return NextResponse.json({}, {status: 200});


}

export const GET = handler;
export const POST = handler;
export const PUT = handler;