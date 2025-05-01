
export const commonCarModels = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Nissan',
  'BMW',
  'Mercedes',
  'Audi',
  'Volkswagen',
  'Other'
] as const;

export type CarModel = (typeof commonCarModels)[number] | string;
