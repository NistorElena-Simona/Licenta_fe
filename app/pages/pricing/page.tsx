"use client";

import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const plans = [
  {
    name: "Basic",
    price: "0",
    description: "Perfect pentru începători",
    features: [
      "Acces la exerciții de bază",
      "Planificare simplă",
      "Suport prin email",
      "Comunitate online"
    ],
    buttonText: "Începe gratuit",
    popular: false
  },
  {
    name: "Pro",
    price: "99",
    description: "Pentru cei care vor să progreseze",
    features: [
      "Toate funcționalitățile Basic",
      "Planificare avansată",
      "Suport prioritar",
      "Acces la conținut premium",
      "Statistici detaliate",
      "Programe personalizate"
    ],
    buttonText: "Începe acum",
    popular: true
  },
  {
    name: "Enterprise",
    price: "199",
    description: "Pentru antrenori și sali de sport",
    features: [
      "Toate funcționalitățile Pro",
      "Gestionare clienți",
      "API personalizat",
      "Suport dedicat 24/7",
      "Branding personalizat",
      "Analytics avansat"
    ],
    buttonText: "Contactează-ne",
    popular: false
  }
];

export default function PricingPage() {
  return (
    <div className="fixed inset-0 overflow-hidden bg-background">
      <div className="h-full w-full px-4 flex flex-col justify-center items-center">
        <div className="text-center mb-8 w-full py-10">
          
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
          {plans.map((plan) => (
            <Card 
              key={plan.name}
              className={`relative h-full flex flex-col ${
                plan.popular 
                  ? "border-2 border-indigo-500 shadow-lg scale-105" 
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Cel mai popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">/lună</span>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-5 w-5 text-indigo-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full text-foreground ${
                    plan.popular 
                      ? "bg-indigo-600 hover:bg-indigo-700" 
                      : "bg-gray-900 hover:bg-gray-800"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Întrebări frecvente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Pot să schimb planul mai târziu?</h3>
              <p className="text-gray-600">Da, poți să-ți actualizezi sau să-ți cobori planul în orice moment.</p>
            </div>
            <div className="bg-background p-6 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Există o perioadă de probă?</h3>
              <p className="text-gray-600">Planul Basic este gratuit pentru totdeauna, iar planul Pro oferă o perioadă de probă de 14 zile.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}