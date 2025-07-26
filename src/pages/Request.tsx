import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Send, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import { useLocationRequests } from "@/hooks/useLocationRequests";

const Request = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    airport: "",
    message: ""
  });
  const { toast } = useToast();
  const { loading: isSubmitting, error, submitRequest } = useLocationRequests();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await submitRequest(formData);

    if (result) {
      toast({
        title: "Request submitted successfully!",
        description: "We'll review your request and get back to you if your request has been approved!",
      });

      setFormData({
        name: "",
        email: "",
        airport: "",
        location: "",
        message: ""
      });
    } else if (error) {
      toast({
        title: "Submission failed",
        description: error,
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Request a Vending Machine</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Help us expand our network! Tell us where you'd like to see baby supply vending machines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Request Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Submit Your Request
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll consider your location for future vending machine placement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-destructive text-sm">{error}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="airport">Airport *</Label>
                  <Input
                    id="airport"
                    name="airport"
                    value={formData.airport}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., JFK, Los Angeles International, ORD"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location (Optional)</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Terminal A, Gate 15, Food Court"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Additional Details (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about why this location would be helpful..."
                    rows={4}
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Your Privacy Matters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We respect your privacy and will only use your information to process your request. 
                  We do not share personal data with third parties and all information is encrypted and stored securely.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Request;