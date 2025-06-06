"use client";

import { useState, useEffect } from 'react';

import { getStripe } from '@/lib/stripe';
import PaymentForm from '@/components/PaymentForm';
import { useAuth } from '@/components/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = getStripe();

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Creează Payment Intent când se încarcă pagina
    const createPaymentIntent = async () => {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Eroare",
          description: "Trebuie să fii autentificat pentru a accesa această pagină",
        });
        return;
      }

      try {
        // Obține token-ul din localStorage
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          throw new Error('Nu ești autentificat');
        }

        // Apelează backend-ul tău NestJS
        const response = await fetch(`http://localhost:3000/payment/create-payment-intent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: 10 // $10 pentru premium
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to create payment intent');
        }

        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error: any) {
        console.error('Error:', error);
        toast({
          variant: "destructive",
          title: "Eroare",
          description: error.message || "A apărut o eroare la inițializarea plății",
        });
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [user, toast]);

  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#0570de',
      colorBackground: '#ffffff',
      colorText: '#30313d',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '2px',
      borderRadius: '4px',
    },
  };

  const options = {
    clientSecret,
    appearance,
    loader: 'auto' as const,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading payment page...</p>
        </div>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">Error initializing payment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ background: 'radial-gradient(circle at 50% 0%, #b3cfff 0%, #1e3a8a 80%, #0a1747 100%)' }}>
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-white">Complete Payment</h1>
          <p className="text-white/80">Activate Premium account for $10/month</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm />
          </Elements>
        </div>

        <div className="mt-6 text-center text-white/60 text-sm">
          <p>Payment is secured through Stripe</p>
          <p>You can cancel anytime in your account settings.</p>
        </div>
      </div>
    </div>
  );
} 