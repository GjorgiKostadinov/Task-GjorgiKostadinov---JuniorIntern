export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  quantityInStock: number; // Забележете, ова се мапира на quantity_in_stock од базата
  category?: string;
  imageUrl?: string;
}