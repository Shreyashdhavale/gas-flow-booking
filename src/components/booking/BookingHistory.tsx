import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookingDetails, CYLINDER_TYPES } from '@/types/booking';
import { useAuth } from '@/contexts/AuthContext';
import { Calendar, MapPin, Truck, Package, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

export const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<BookingDetails[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load bookings from localStorage
    const allBookings = JSON.parse(localStorage.getItem('lpg_bookings') || '[]');
    const userBookings = allBookings.filter((booking: BookingDetails) => booking.userId === user?.id);
    setBookings(userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, [user?.id]);

  const getCylinderDetails = (cylinderId: string) => {
    return CYLINDER_TYPES.find(c => c.id === cylinderId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-secondary text-secondary-foreground';
      case 'delivered': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-secondary text-secondary-foreground';
      case 'failed': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">No Bookings Yet</h3>
        <p className="text-muted-foreground">Your booking history will appear here once you make your first order.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">Your Booking History</h3>
        <Badge variant="secondary" className="text-sm">
          {bookings.length} booking{bookings.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => {
          const cylinder = getCylinderDetails(booking.cylinderId);
          return (
            <Card key={booking.id} className="hover:shadow-medium transition-smooth">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {cylinder?.name} - {cylinder?.weight}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(booking.createdAt), 'PPp')}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status}
                    </Badge>
                    <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                      <CreditCard className="h-3 w-3 mr-1" />
                      {booking.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="font-medium text-muted-foreground">Quantity</p>
                    <p className="text-foreground">{booking.quantity} cylinder{booking.quantity > 1 ? 's' : ''}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="font-medium text-muted-foreground">Delivery Type</p>
                    <div className="flex items-center gap-1">
                      {booking.deliveryType === 'home' ? (
                        <>
                          <Truck className="h-3 w-3 text-primary" />
                          <span>Home Delivery</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-3 w-3 text-secondary" />
                          <span>Store Pickup</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="font-medium text-muted-foreground">Total Amount</p>
                    <p className="text-lg font-bold text-primary">₹{booking.totalAmount}</p>
                  </div>
                </div>

                {booking.deliveryAddress && (
                  <div className="pt-3 border-t">
                    <p className="font-medium text-muted-foreground text-sm mb-1">Delivery Address</p>
                    <p className="text-sm text-foreground">{booking.deliveryAddress}</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-3 border-t text-xs text-muted-foreground">
                  <span>Booking ID: #{booking.id}</span>
                  <span>Delivery Charge: ₹{booking.deliveryCharge}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};