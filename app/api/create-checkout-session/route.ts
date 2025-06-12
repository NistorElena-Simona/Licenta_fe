// import { NextRequest, NextResponse } from 'next/server';
// import Stripe from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2024-06-20',
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { priceId, userId } = await request.json();

//     // Creează sesiunea de checkout
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price: priceId, // Price ID din Stripe Dashboard
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: `${process.env.NEXT_PUBLIC_APP_URL}/pages/pricing?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pages/pricing`,
//       metadata: {
//         userId: userId,
//       },
//       customer_email: undefined, // Poți adăuga email-ul utilizatorului aici
//     });

//     return NextResponse.json({ sessionId: session.id });
//   } catch (error: any) {
//     console.error('Error creating checkout session:', error);
//     return NextResponse.json(
//       { error: 'Error creating checkout session' },
//       { status: 500 }
//     );
//   }
// } 