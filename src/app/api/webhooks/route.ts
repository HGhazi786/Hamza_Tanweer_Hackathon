import Stripe from "stripe";
import { db, cartTable } from "../../lib/drizzle";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@clerk/nextjs"; 
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
export async function POST(req: any, res: any) {

  const headerslist = headers();

  try {
    const rawBody = await req.text();
    const sig = headerslist.get("stripe-signature");

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2022-11-15",
    });

    let event;

    try {
      if (!sig || !endpointSecret) {
        return new Response(`Webhook Signature Or Endpoint Secret is Missing`, {
          status: 400,
        });
      }

      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        sig,
        endpointSecret
      );
    } catch (err: any) {
      console.log(`⚠️  Webhook sig`);
      return new Response("webhooks signature / endpoint secret missing", {
        status: 400,
      });
    }
    console.log(event.type)

    if ("checkout.session.completed" === event.type) {
      const session = event.data.object;
      // @ts-ignore
      const customerData = await stripe.customers.retrieve(session.customer);
      // @ts-ignore
      const userId = customerData.metadata.userId;
      console.log

      await db.delete(cartTable).where(eq(cartTable.user_id, userId)).returning();

      console.log("payment success-----------------------", session);
      // @ts-ignore
      const line_Items = await stripe.checkout.sessions.listLineItems(event.data.object!.id);

      return new Response("Payment Confirmation Router Reciept", {
        status: 200,
      });
    } else {
      res.setHeader("Allow", "POST");
      // res.status(405).end("Method Not Allowed");
    }
  } catch (err: any) {
    console.log("Error in webhook----------", err);
    // res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
}
