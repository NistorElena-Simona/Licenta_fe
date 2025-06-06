"use client";

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js nu s-a încărcat încă
      return;
    }

    setIsLoading(true);

    try {
      // Confirmă plata cu Stripe
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message || "An error occurred while processing your payment");
        } else {
          setMessage("A apărut o eroare neașteptată.");
        }

        toast({
          variant: "destructive",
          title: "Payment error",
          description: error.message || "An error occurred while processing your payment",
        });
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Plata a fost reușită, confirmă în backend
        const token = localStorage.getItem('accessToken');
        
        try {
          const response = await fetch(`http://localhost:3000/payment/confirm-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              paymentIntentId: paymentIntent.id
            }),
          });

          if (response.ok) {
            const result = await response.json();
            toast({
              title: "Payment successful!",
              description: "Premium account has been successfully activated!",
            });
            
            // Redirectează către pagina de pricing cu succes
            router.push('/pages/pricing?payment=success');
          } else {
            throw new Error('Error confirming payment in the backend');
          }
        } catch (backendError) {
          console.error('Backend confirmation error:', backendError);
          toast({
            variant: "destructive",
            title: "Careful",
            description: "Payment was processed, but an error occurred while activating Premium. Contact support",
          });
        }
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setMessage("Unexcepted error ");
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while processing your payment.",
      });
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs" as const,
    business: {
      name: "Fitness App Premium"
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment details</h3>
        <PaymentElement 
          id="payment-element" 
          options={paymentElementOptions}
        />
      </div>

      <Button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 text-lg font-semibold"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </div>
          ) : (
            "Pay $10"
          )}
        </span>
      </Button>

      {/* Afișează mesajele de eroare */}
      {message && (
        <div id="payment-message" className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {message}
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-600">
        <p>✓ Secure payment via Stripe</p>
        <p>✓ Card data is encrypted</p>
        <p>✓ We do not store card information.</p>
      </div>
    </form>
  );
} 