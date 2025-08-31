import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { CylinderType, DELIVERY_CHARGES, BookingDetails } from '@/types/booking';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Truck, MapPin, Calculator, CreditCard } from 'lucide-react';

interface BookingModalProps {
  cylinder: CylinderType;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ cylinder, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryType, setDeliveryType] = useState<'home' | 'pickup'>('home');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const baseAmount = cylinder.price * quantity;
  const deliveryCharge = DELIVERY_CHARGES[deliveryType];
  const totalAmount = baseAmount + deliveryCharge;

  const handleBooking = async () => {
    if (deliveryType === 'home' && !deliveryAddress.trim()) {
      toast({
        title: "Address Required",
        description: "Please provide delivery address for home delivery.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const booking: BookingDetails = {
        id: Date.now().toString(),
        userId: user!.id,
        cylinderId: cylinder.id,
        quantity,
        deliveryType,
        deliveryAddress: deliveryType === 'home' ? deliveryAddress : undefined,
        totalAmount,
        deliveryCharge,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        paymentStatus: 'paid',
      };

      // Save to localStorage
      const existingBookings = JSON.parse(localStorage.getItem('lpg_bookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('lpg_bookings', JSON.stringify(existingBookings));

      // Simulate email sending
      console.log('Sending email receipt to:', user!.email);
      console.log('Booking details:', booking);

      toast({
        title: "Booking Confirmed!",
        description: `Your ${cylinder.name} cylinder has been booked successfully. Receipt sent to ${user!.email}`,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Book {cylinder.name}
          </DialogTitle>
          <DialogDescription>
            Complete your cylinder booking with delivery preferences
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cylinder Details */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{cylinder.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{cylinder.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{cylinder.weight}</span>
              <span className="text-xl font-bold text-primary">₹{cylinder.price}</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max="5"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          {/* Delivery Type */}
          <div className="space-y-4">
            <Label>Delivery Option</Label>
            <RadioGroup value={deliveryType} onValueChange={(value: 'home' | 'pickup') => setDeliveryType(value)}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-smooth">
                <RadioGroupItem value="home" id="home" />
                <div className="flex-1">
                  <label htmlFor="home" className="flex items-center gap-2 cursor-pointer">
                    <Truck className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">Home Delivery</p>
                      <p className="text-sm text-muted-foreground">₹{DELIVERY_CHARGES.home} delivery charge</p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-smooth">
                <RadioGroupItem value="pickup" id="pickup" />
                <div className="flex-1">
                  <label htmlFor="pickup" className="flex items-center gap-2 cursor-pointer">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <div>
                      <p className="font-medium">Store Pickup</p>
                      <p className="text-sm text-muted-foreground">Free pickup from our store</p>
                    </div>
                  </label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Delivery Address */}
          {deliveryType === 'home' && (
            <div className="space-y-2">
              <Label htmlFor="address">Delivery Address</Label>
              <Textarea
                id="address"
                placeholder="Enter complete delivery address..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={3}
              />
            </div>
          )}

          {/* Price Breakdown */}
          <div className="p-4 bg-card border rounded-lg space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Price Breakdown</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Base Price ({quantity}x ₹{cylinder.price})</span>
                <span>₹{baseAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>₹{deliveryCharge}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              variant="hero" 
              onClick={handleBooking} 
              disabled={isProcessing}
              className="flex-1 flex items-center gap-2"
            >
              <CreditCard className="h-4 w-4" />
              {isProcessing ? "Processing..." : `Pay ₹${totalAmount}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};