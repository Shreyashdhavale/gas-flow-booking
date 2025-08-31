export interface CylinderType {
  id: string;
  name: string;
  weight: string;
  price: number;
  description: string;
  category: 'domestic' | 'commercial';
}

export interface BookingDetails {
  id: string;
  userId: string;
  cylinderId: string;
  quantity: number;
  deliveryType: 'home' | 'pickup';
  deliveryAddress?: string;
  totalAmount: number;
  deliveryCharge: number;
  status: 'pending' | 'confirmed' | 'delivered';
  createdAt: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export const CYLINDER_TYPES: CylinderType[] = [
  {
    id: '1',
    name: 'Standard Domestic',
    weight: '14.2 kg',
    price: 850,
    description: 'Standard net weight of gas for domestic use in India',
    category: 'domestic'
  },
  {
    id: '2', 
    name: 'Small Domestic',
    weight: '5 kg',
    price: 450,
    description: 'Smaller domestic cylinder, perfect for small families',
    category: 'domestic'
  },
  {
    id: '3',
    name: 'Commercial',
    weight: '19 kg', 
    price: 1200,
    description: 'Commercial use cylinder for restaurants and businesses',
    category: 'commercial'
  }
];

export const DELIVERY_CHARGES = {
  home: 50,
  pickup: 0
};