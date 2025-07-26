import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Package, Star, Plane, Baby, Search, Gift } from "lucide-react";
import Navigation from "@/components/Navigation";
import SearchBar from "@/components/SearchBar";
import DiscountPopup from "@/components/DiscountPopup";
import heroImage from "@/assets/hero-airport.jpg";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);

  // Show discount popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiscountPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Mock vending machine data
  const mockVendingMachines = [
    {
      id: 1,
      airport: "JFK",
      terminal: "Terminal 4",
      location: "Near Gate A12",
      hours: "24/7",
      supplies: ["Diapers", "Formula", "Baby Food", "Pacifiers", "Wipes"],
      rating: 4.8,
      distance: "0.2 miles from your location"
    },
    {
      id: 2,
      airport: "JFK",
      terminal: "Terminal 1",
      location: "Food Court",
      hours: "6 AM - 11 PM",
      supplies: ["Diapers", "Formula", "Wipes", "Baby Bottles"],
      rating: 4.6,
      distance: "0.5 miles from your location"
    }
  ];

  const handleSearch = (query: string) => {
    setHasSearched(true);
    // Mock search results based on query
    if (query.toLowerCase().includes('jfk') || query.toLowerCase().includes('kennedy')) {
      setSearchResults(mockVendingMachines);
    } else {
      setSearchResults([]);
    }
  };

  const featuredSupplies = [
    { icon: Baby, name: "Baby Formula", description: "Infant and toddler formulas" },
    { icon: Package, name: "Diapers", description: "Various sizes available" },
    { icon: Package, name: "Baby Food", description: "Pouches and jars" },
    { icon: Package, name: "Pacifiers", description: "Different sizes and styles" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
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

      {/* Search Results */}
      {hasSearched && (
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">
              {searchResults.length > 0 ? "Vending Machines Found" : "No Results Found"}
            </h2>
            
            {searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {searchResults.map((machine) => (
                  <Card key={machine.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <Plane className="h-5 w-5 text-primary" />
                            {machine.airport} - {machine.terminal}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 mt-2">
                            <MapPin className="h-4 w-4" />
                            {machine.location}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{machine.rating}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {machine.hours}
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Available Supplies:</p>
                          <div className="flex flex-wrap gap-2">
                            {machine.supplies.map((supply) => (
                              <Badge key={supply} variant="secondary">
                                {supply}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">{machine.distance}</p>
                        
                        <Button className="w-full">
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No vending machines found</h3>
                  <p className="text-muted-foreground mb-6">
                    We don't have any vending machines at this airport yet.
                  </p>
                  <Button>
                    Request a Machine Here
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Essential Baby Supplies</h2>
            <p className="text-xl text-muted-foreground">
              Our vending machines are stocked with everything you might need for your little one.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSupplies.map((supply) => (
              <Card key={supply.name} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="py-8">
                  <supply.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{supply.name}</h3>
                  <p className="text-sm text-muted-foreground">{supply.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      
      <DiscountPopup 
        isOpen={showDiscountPopup} 
        onClose={() => setShowDiscountPopup(false)} 
      />
    </div>
  );
};

export default Index;
