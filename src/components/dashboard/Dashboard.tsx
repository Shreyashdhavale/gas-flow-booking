import React, { useState } from 'react';
import { CylinderCard } from './CylinderCard';
import { BookingModal } from '../booking/BookingModal';
import { CYLINDER_TYPES, CylinderType } from '@/types/booking';
import { Header } from '../layout/Header';
import { BookingHistory } from '../booking/BookingHistory';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, History, Flame } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [selectedCylinder, setSelectedCylinder] = useState<CylinderType | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBookCylinder = (cylinder: CylinderType) => {
    setSelectedCylinder(cylinder);
    setIsBookingModalOpen(true);
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedCylinder(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Choose Your LPG Cylinder
          </h2>
          <p className="text-muted-foreground">
            Select from our range of domestic and commercial cylinders
          </p>
        </div>

        <Tabs defaultValue="booking" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="booking" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Book Cylinder
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Booking History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CYLINDER_TYPES.map((cylinder) => (
                <CylinderCard
                  key={cylinder.id}
                  cylinder={cylinder}
                  onBook={handleBookCylinder}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <BookingHistory />
          </TabsContent>
        </Tabs>

        {selectedCylinder && (
          <BookingModal
            cylinder={selectedCylinder}
            isOpen={isBookingModalOpen}
            onClose={handleCloseBookingModal}
          />
        )}
      </main>
    </div>
  );
};