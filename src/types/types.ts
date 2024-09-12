// Тип для рейтинга продукта
export interface Rating {
  rate: number;
  count: number;
}
// Тип для фильтра
export type FilterType =
  | "all"
  | "favorites"
  | "men's clothing"
  | "jewelery"
  | "electronics"
  | "women's clothing";
// Тип для продукта
export interface Product {
  id: number | string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}
