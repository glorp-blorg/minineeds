import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Gift, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {insertEmail} from "@/lib/api"

interface DiscountPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const DiscountPopup = ({ isOpen, onClose }: DiscountPopupProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Discount Code Sent!",
      description: `Your 15% discount code has been sent to ${email}`,
    });

    setEmail("");
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Get 15% Off Your Purchase
          </DialogTitle>
          <DialogDescription>
            Enter your email to receive an exclusive discount code for baby supplies at our vending machines.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discount-email">Email Address</Label>
            <Input
              id="discount-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Sending..." : "Get Discount Code"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </form>
        
        <p className="text-xs text-muted-foreground">
          By providing your email, you agree to receive promotional offers. You can unsubscribe at any time.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountPopup;