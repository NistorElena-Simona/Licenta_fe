import { loadStripe } from '@stripe/stripe-js';

// Inițializează Stripe cu cheia publică
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
}; 