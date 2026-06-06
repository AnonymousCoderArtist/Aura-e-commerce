export interface SpecItem {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  isVerified: boolean;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviews: Review[];
  description: string;
  specifications: SpecItem[];
  features: string[];
  colors: { name: string; hex: string }[];
  sizes?: string[];
  images: string[];
  stock: number;
  tag?: string; // e.g. "Limited", "New Season", "Editor's Pick"
  gradient3D: string; // Tailwinds bg gradient classes for carousel
}

export interface CartItem {
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize?: string;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  customerName: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  cardNumberMasked: string;
  date: string;
  status: 'processing' | 'shipped' | 'out_for_delivery' | 'delivered';
}
