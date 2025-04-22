
export const commonCarTypes = [
  'Sedan',
  'SUV',
  'Hatchback',
  'Pickup Truck',
  'Van',
  'Coupe',
  'Other'
] as const;

export type CarType = (typeof commonCarTypes)[number] | string;
