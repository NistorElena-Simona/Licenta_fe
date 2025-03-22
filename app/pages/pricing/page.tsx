import { title } from "@/components/primitives";
import { Card, CardContent } from "@/components/ui/card";


import { useTheme } from "next-themes";

export default function PricingPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen p-10 ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      <h1 className={title()}>Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Monthly Pricing Card */}
        <Card className={`p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
          <CardContent>
            <h2 className="text-2xl font-bold">Monthly Plan</h2>
            <p className="text-lg mt-2">$29 / month</p>
            <p className="text-sm text-gray-500 mt-2">Billed every month</p>
          </CardContent>
        </Card>
        
        {/* Yearly Pricing Card */}
        <Card className={`p-6 rounded-xl shadow-lg ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
          <CardContent>
            <h2 className="text-2xl font-bold">Yearly Plan</h2>
            <p className="text-lg mt-2">$299 / year</p>
            <p className="text-sm text-gray-500 mt-2">Save 14% by paying yearly</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
