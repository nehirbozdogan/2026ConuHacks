
export enum AircraftSize {
  LIGHT = 'Light Jet',
  MIDSIZE = 'Midsize Jet',
  LARGE = 'Large Cabin',
  TURBOPROP = 'Turboprop'
}

export interface Aircraft {
  id: string;
  model: string;
  manufacturer: string;
  price: number;
  range: number; // in Nautical Miles
  speed: number; // in Knots
  capacity: number;
  size: AircraftSize;
  description: string;
  imageUrl: string;
}

export interface FilterOptions {
  maxPrice: number;
  minRange: number;
  size: AircraftSize | 'All';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
