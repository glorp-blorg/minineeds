import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Package,
  Star,
  Plane,
  Search,
  Gift,
  Milk,
  Apple
} from "lucide-react";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import DiscountPopup from "@/components/DiscountPopup";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/new-hero.png";
import sampleVendingMachine from "@/assets/sample_vending_machine.png";

interface VendingMachine {
  id: string;
  airport_code: string;
  airport_name: string;
  terminal: string;
  location: string;
  status: 'active' | 'maintenance' | 'inactive';
  created_at: string;
  updated_at: string;
  rating?: number;
  hours?: string;
  supplies?: string[];
}

const Index = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [machines, setMachines] = useState<VendingMachine[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiscountPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = async (query: string) => {
    setHasSearched(true);
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("VendingMachine")
        .select("*")
        .or(`airport_code.ilike.%${query}%,airport_name.ilike.%${query}%`);

      if (error) throw error;
      setMachines(data || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setMachines([]);
    } finally {
      setLoading(false);
    }
  };

  const featuredSupplies = [
    { icon: Milk, name: "Baby Formula", description: "Infant and toddler formulas" },
    { icon: Package, name: "Diapers", description: "Various sizes available" },
    { icon: Apple, name: "Baby Food", description: "Pouches and jars" },
    { icon: Gift, name: "Pacifiers", description: "Different sizes and styles" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Need Baby Supplies at the Airport?
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            We've Got You. Find vending machines with emergency baby supplies in major airports worldwide.
          </p>

          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} className="mb-6" />
            <Button
              onClick={() => setShowDiscountPopup(true)}
              variant="secondary"
              size="lg"
              className="bg-white/10 text-white border border-white/20 hover:bg-white/20"
            >
              <Gift className="mr-2 h-4 w-4" />
              Get 15% Off Discount Code
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-white/80">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <span>50+ Airports</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>24/7 Availability</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <span>Essential Supplies</span>
            </div>
          </div>
        </div>
      </section>

      {/* ... rest of the component remains unchanged ... */}

      <DiscountPopup
        isOpen={showDiscountPopup}
        onClose={() => setShowDiscountPopup(false)}
      />
    </div>
  );
};

export default Index;
