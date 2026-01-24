
import { Aircraft, AircraftSize } from './types';

export const AIRCRAFT_DATA: Aircraft[] = [
  {
    id: '1',
    model: 'Citation Longitude',
    manufacturer: 'Cessna',
    price: 26000000,
    range: 3500,
    speed: 483,
    capacity: 12,
    size: AircraftSize.LARGE,
    description: 'The super-midsize Citation Longitude is designed with your business and return on investment in mind.',
    imageUrl: 'https://picsum.photos/seed/jet1/800/600'
  },
  {
    id: '2',
    model: 'G700',
    manufacturer: 'Gulfstream',
    price: 75000000,
    range: 7500,
    speed: 516,
    capacity: 19,
    size: AircraftSize.LARGE,
    description: 'The flagship of the Gulfstream fleet, offering unparalleled range, speed, and luxury.',
    imageUrl: 'https://picsum.photos/seed/jet2/800/600'
  },
  {
    id: '3',
    model: 'Phenom 300E',
    manufacturer: 'Embraer',
    price: 9500000,
    range: 2010,
    speed: 464,
    capacity: 6,
    size: AircraftSize.LIGHT,
    description: 'The world\'s best-selling light jet for 11 consecutive years.',
    imageUrl: 'https://picsum.photos/seed/jet3/800/600'
  },
  {
    id: '4',
    model: 'Global 7500',
    manufacturer: 'Bombardier',
    price: 73000000,
    range: 7700,
    speed: 516,
    capacity: 19,
    size: AircraftSize.LARGE,
    description: 'The largest and longest-range business jet in the world.',
    imageUrl: 'https://picsum.photos/seed/jet4/800/600'
  },
  {
    id: '5',
    model: 'PC-12 NGX',
    manufacturer: 'Pilatus',
    price: 5400000,
    range: 1803,
    speed: 290,
    capacity: 9,
    size: AircraftSize.TURBOPROP,
    description: 'The world\'s most versatile and popular single-engine turboprop.',
    imageUrl: 'https://picsum.photos/seed/jet5/800/600'
  },
  {
    id: '6',
    model: 'Falcon 8X',
    manufacturer: 'Dassault',
    price: 58000000,
    range: 6450,
    speed: 475,
    capacity: 14,
    size: AircraftSize.LARGE,
    description: 'The ultimate combination of efficiency, versatility, and tri-jet safety.',
    imageUrl: 'https://picsum.photos/seed/jet6/800/600'
  }
];
