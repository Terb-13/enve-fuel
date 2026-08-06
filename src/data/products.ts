export type ProductCategory = "gels" | "hydration" | "chews";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ProductCategory;
  price: number; // cents
  compareAt?: number;
  image: string;
  gallery?: string[];
  badges: string[];
  specs: { label: string; value: string }[];
  flavors?: string[];
  packSize: string;
  featured?: boolean;
};

export const categories: {
  id: ProductCategory | "all";
  label: string;
}[] = [
  { id: "all", label: "All Fuel" },
  { id: "gels", label: "Gels" },
  { id: "hydration", label: "Hydration" },
  { id: "chews", label: "Chews" },
];

export const products: Product[] = [
  {
    id: "gel-30",
    slug: "enve-gel-30",
    name: "ENVE Gel 30",
    tagline: "Precision carbohydrate. Race weight packaging.",
    description:
      "A clean 30g carb hit engineered for tempo efforts and long climbs. Matte black pouch, tear notch you can open with gloves on, and a maltodextrin-fructose blend that empties without gut drama. Built for the same riders who trust ENVE carbon on race day.",
    category: "gels",
    price: 350,
    image: "/products/gel-30.jpg",
    badges: ["30g carb", "Original", "Gluten free"],
    specs: [
      { label: "Carbohydrate", value: "30 g" },
      { label: "Caffeine", value: "0 mg" },
      { label: "Net wt.", value: "51 g" },
      { label: "Ratio", value: "2:1 glucose:fructose" },
    ],
    flavors: ["Original"],
    packSize: "Single / Box of 12",
    featured: true,
  },
  {
    id: "gel-50",
    slug: "enve-rocket-gel",
    name: "ENVE Rocket Gel",
    tagline: "50g carb. 100mg caffeine. This is your rocket fuel.",
    description:
      "Double the carbohydrate load with a precise 100mg caffeine kick for late-race surges. Same black composite-inspired pouch language as the rest of ENVE Fuel — stacked in a display box ready for the team car or your ride kitchen.",
    category: "gels",
    price: 425,
    image: "/products/gel-50.jpg",
    badges: ["50g carb", "100mg caffeine", "Caffeinated"],
    specs: [
      { label: "Carbohydrate", value: "50 g" },
      { label: "Caffeine", value: "100 mg" },
      { label: "Net wt.", value: "72 g" },
      { label: "Ratio", value: "2:1 glucose:fructose" },
    ],
    flavors: ["Caffeinated Original"],
    packSize: "Single / Box of 12",
    featured: true,
  },
  {
    id: "fizz-tubes",
    slug: "enve-fizz",
    name: "ENVE Fizz",
    tagline: "B12 energy. Zero sugar. Drop in water.",
    description:
      "Effervescent multi-vitamin electrolyte tablets for bottle-to-bottle hydration. Zero sugar, B12 for sustained energy, and electrolytes dialed for long days in the heat. Three race-ready flavors in travel tubes — grape, fruit punch, and orange soda.",
    category: "hydration",
    price: 1299,
    image: "/products/fizz-tubes.jpg",
    badges: ["0 sugar", "B12", "Electrolytes"],
    specs: [
      { label: "Servings", value: "10 per tube" },
      { label: "Sugar", value: "0 g" },
      { label: "Energy window", value: "4–6 hours" },
      { label: "Mix", value: "16–20 fl oz water" },
    ],
    flavors: ["Grape", "Fruit Punch", "Orange Soda"],
    packSize: "10 tablets / tube",
    featured: true,
  },
  {
    id: "fizz-combo",
    slug: "enve-fizz-combo",
    name: "ENVE Fizz Combo Pack",
    tagline: "30 tubes. Three flavors. One training block.",
    description:
      "The full hydration kit: ten tubes each of Grape, Fruit Punch, and Orange Soda. Stock the fridge, the race cooler, and the team bus. Same B12 + electrolyte formula — zero sugar, drop-and-go mix for every bottle on the course.",
    category: "hydration",
    price: 3499,
    compareAt: 3897,
    image: "/products/fizz-combo.jpg",
    gallery: ["/products/fizz-tubes.jpg"],
    badges: ["30 tubes", "Combo", "Best value"],
    specs: [
      { label: "Tubes", value: "30 total" },
      { label: "Per flavor", value: "10 tubes" },
      { label: "Servings", value: "300 tablets" },
      { label: "Sugar", value: "0 g" },
    ],
    flavors: ["Grape", "Fruit Punch", "Orange Soda"],
    packSize: "30 × 10-tablet tubes",
  },
  {
    id: "chews",
    slug: "enve-energy-chews",
    name: "ENVE Energy Chews",
    tagline: "Pink lemonade. Pocket fuel you can pace.",
    description:
      "Soft energy chews with a bright pink lemonade profile — naturally flavored, gluten free, and easy to portion mid-effort. Honeycomb-inspired packaging meets ENVE’s race-day graphic system. Trust the fuel the peloton stacks in jersey pockets.",
    category: "chews",
    price: 2899,
    image: "/products/chews.jpg",
    badges: ["Pink lemonade", "Gluten free", "Box of 12"],
    specs: [
      { label: "Packs", value: "12 pouches" },
      { label: "Flavor", value: "Pink lemonade" },
      { label: "Net wt. / pack", value: "50 g" },
      { label: "Diet", value: "Gluten free" },
    ],
    flavors: ["Pink Lemonade"],
    packSize: "Box of 12 pouches",
    featured: true,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeatured() {
  return products.filter((p) => p.featured);
}
