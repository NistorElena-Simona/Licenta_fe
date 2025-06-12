"use client";

import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/context/AuthContext";
import { useModalContext } from "@/components/context/ModalContext";
import { useSearchParams } from "next/navigation";

const plans = [
  {
    name: "Basic",
    price: "0",
    description: "Perfect for beginners",
    features: [
      "Access to basic exercises",
      "3D body visualization",
      "Video tutorials for each exercise",
      "Muscle anatomy information",
      "Exercise search functionality"
    ],
    buttonText: "You are free user already",
    popular: false,
    disabled: true,
    priceId: null
  },
  {
    name: "Pro",
    price: "10",
    description: "For those who want to progress",
    features: [
      "All Basic features included",
      "Personal favorite exercises list",
      "Access to challenges",
      "Advanced exercise filtering",
      "Priority support",
      "Enhanced user experience"
    ],
    buttonText: "Get Started",
    popular: true,
    disabled: false,
    priceId: "price_1234567890" // Înlocuiește cu Price ID-ul real din Stripe Dashboard
  }
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  const searchParams = useSearchParams();
  const { toggleModal } = useModalContext();

  useEffect(() => {
    if (searchParams) {
      const sessionId = searchParams.get('session_id');
      if (sessionId) {
        setIsPremium(true);
        
        toast({
          title: "Payment successful!",
          description: "Congratulations! You now have access to all Pro features.",
          duration: 5000,
        });

        const url = new URL(window.location.href);
        url.searchParams.delete('session_id');
        window.history.replaceState({}, '', url.toString());
      }
    }
  }, [searchParams, toast]);

  const handleCheckout = async (priceId: string, planName: string) => {
    if (!priceId) return;
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to purchase Premium.",
      });
      return;
    }
    
    setLoading(priceId);
    
    try {
      window.location.href = '/pages/checkout';
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "An error occurred while processing your payment.",
      });
    } finally {
      setLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'radial-gradient(circle at 50% 0%, #b3cfff 0%, #1e3a8a 80%, #0a1747 100%)' }}>
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Loading...</h2>
          <p className="text-gray-600">Please wait while we verify your authentication...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'radial-gradient(circle at 50% 0%, #b3cfff 0%, #1e3a8a 80%, #0a1747 100%)' }}>
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Authentication Required</h2>
          <p className="text-gray-600 mb-6">You must be logged in to view pricing plans.</p>
          <Button 
            onClick={toggleModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12" style={{ background: 'radial-gradient(circle at 50% 0%, #b3cfff 0%, #1e3a8a 80%, #0a1747 100%)' }}>
      <div className="container mx-auto px-4 flex flex-col justify-center items-center">
        <div className="text-center mb-8 w-full py-10">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Choose Your Perfect Plan</h1>
          <p className="text-xl text-foreground/80">Start transforming your fitness journey with our flexible plans</p>
          {isPremium && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg inline-block">
             🎉 Congratulations! You have active Premium status!
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl justify-center">
          {plans.map((plan) => {
            const isCurrentlyPremium = isPremium && plan.name === "Pro";
            const buttonText = isCurrentlyPremium ? "Current Plan ✓" : plan.buttonText;
            const isDisabled = plan.disabled || isCurrentlyPremium;

            return (
              <Card 
                key={plan.name}
                className={`relative h-full flex flex-col ${
                  plan.popular 
                    ? "border-2 border-indigo-500 shadow-lg scale-105" 
                    : "border border-gray-200"
                } ${isCurrentlyPremium ? "bg-green-50 border-green-400" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className={`text-white text-sm font-semibold px-4 py-1 rounded-full ${
                      isCurrentlyPremium ? "bg-green-500" : "bg-indigo-500"
                    }`}>
                      {isCurrentlyPremium ? "Active Plan" : "Most Popular"}
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className={`h-5 w-5 mr-2 ${
                          isCurrentlyPremium ? "text-green-500" : "text-indigo-500"
                        }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    disabled={isDisabled || loading === plan.priceId}
                    onClick={() => plan.priceId && handleCheckout(plan.priceId, plan.name)}
                    className={`w-full ${
                      isDisabled
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : isCurrentlyPremium
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : plan.popular 
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                            : "bg-gray-900 hover:bg-gray-800 text-white"
                    }`}
                  >
                    {loading === plan.priceId ? "Already in use" : buttonText}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time from your account settings.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-gray-600">The Basic plan is free forever, and you can try Pro features with a 14-day free trial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}