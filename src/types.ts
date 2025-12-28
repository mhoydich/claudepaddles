export interface Paddle {
  id: string;
  name: string;
  brand: string;
  price: number;
  weight: number; // in ounces
  coreThickness: number; // in mm
  coreMaterial: CoreMaterial;
  surfaceMaterial: SurfaceMaterial;
  shape: PaddleShape;
  gripLength: number; // in inches
  gripCircumference: number; // in inches
  power: number; // 1-10
  control: number; // 1-10
  spin: number; // 1-10
  sweetSpot: SweetSpotSize;
  playStyle: PlayStyle[];
  skillLevel: SkillLevel[];
  features: string[];
  description: string;
  pros: string[];
  cons: string[];
  imageColor: string;
}

export type CoreMaterial =
  | 'Polymer Honeycomb'
  | 'Nomex Honeycomb'
  | 'Aluminum Honeycomb'
  | 'Polypropylene Honeycomb'
  | 'Carbon Fiber Honeycomb';

export type SurfaceMaterial =
  | 'Carbon Fiber'
  | 'Fiberglass'
  | 'Graphite'
  | 'Composite'
  | 'Raw Carbon'
  | 'Kevlar'
  | 'T700 Carbon'
  | 'Toray Carbon';

export type PaddleShape =
  | 'Standard'
  | 'Elongated'
  | 'Wide Body'
  | 'Hybrid';

export type SweetSpotSize =
  | 'Small'
  | 'Medium'
  | 'Large'
  | 'Extra Large';

export type PlayStyle =
  | 'Power'
  | 'Control'
  | 'Spin'
  | 'All-Around'
  | 'Touch'
  | 'Defensive'
  | 'Aggressive';

export type SkillLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Pro';

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  playStyles: PlayStyle[];
  skillLevels: SkillLevel[];
  shapes: PaddleShape[];
  coreMaterials: CoreMaterial[];
  surfaceMaterials: SurfaceMaterial[];
  weightRange: [number, number];
  powerRange: [number, number];
  controlRange: [number, number];
  spinRange: [number, number];
}
