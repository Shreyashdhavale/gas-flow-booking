import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CylinderType } from '@/types/booking';
import { Flame, Home, Building2 } from 'lucide-react';

interface CylinderCardProps {
  cylinder: CylinderType;
  onBook: (cylinder: CylinderType) => void;
}

export const CylinderCard: React.FC<CylinderCardProps> = ({ cylinder, onBook }) => {
  const CategoryIcon = cylinder.category === 'domestic' ? Home : Building2;
  
  return (
    <Card className="hover:shadow-medium transition-smooth transform hover:scale-105 cursor-pointer group">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-4 bg-gradient-primary rounded-full w-fit group-hover:bg-gradient-secondary transition-smooth">
          <Flame className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-foreground">{cylinder.name}</CardTitle>
        <CardDescription className="flex items-center justify-center gap-2">
          <CategoryIcon className="h-4 w-4" />
          <span className="capitalize">{cylinder.category}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="text-center space-y-4">
        <div className="space-y-2">
          <Badge variant="secondary" className="text-lg font-bold px-4 py-2">
            {cylinder.weight}
          </Badge>
          <p className="text-sm text-muted-foreground">{cylinder.description}</p>
        </div>
        
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-2xl font-bold text-primary">₹{cylinder.price}</p>
          <p className="text-xs text-muted-foreground">Base Price</p>
        </div>
      </CardContent>
      
      <CardFooter className="pt-4">
        <Button 
          variant="hero" 
          className="w-full"
          onClick={() => onBook(cylinder)}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};