import { create } from "zustand";
import axios from "axios";
import { devtools, persist } from "zustand/middleware";
import { FilterType, Product } from "../types/types";

interface ProductStore {
  products: Product[];
  favorites: Product[];
  filter: FilterType;
  currentPage: number;
  pageSize: number;
  searchText: string;
  isLoading: boolean;
  targetProduct: Product | null;
  fetchProducts: () => Promise<void>;
  getProductById: (id: number | string) => Product | null;
  addProduct: (product: Omit<Product, "id">) => void;
  toggleFavorite: (id: number | string) => void;
  removeProduct: (id: number | string) => void;
  setFilter: (filter: FilterType) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (page: number) => void;
  setSearchText: (text: string) => void;
}

// Создание стора
const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set, get) => ({
        products: [] as Product[],
        favorites: [] as Product[],
        filter: "all" as FilterType,
        targetProduct: null as Product | null,
        isLoading: false as boolean,
        currentPage: 1,
        pageSize: 8,
        searchText: "",
        fetchProducts: async () => {
          try {
            set({ isLoading: true });
            const response = await axios.get(
              "https://fakestoreapi.com/products",
            );
            const products = response.data;
            set({ products });
          } catch (error) {
            console.error("Failed to fetch products:", error);
          } finally {
            set({ isLoading: false });
          }
        },
        getProductById: (id: number | string): Product | null => {
          const product = get().products.find((product) => product.id === id);
          return product || null;
        },
        toggleFavorite: (id: number | string) => {
          set((state) => {
            const isFavorite = state.favorites.some(
              (favProduct) => favProduct.id === id,
            );
            const product = state.products.find((product) => product.id === id);

            return {
              favorites: isFavorite
                ? state.favorites.filter((favProduct) => favProduct.id !== id)
                : product
                  ? [...state.favorites, product]
                  : state.favorites,
            };
          });
        },
        removeProduct: (id: number | string) => {
          set((state) => ({
            products: state.products.filter((product) => product.id !== id),
            favorites: state.favorites.filter((product) => product.id !== id),
          }));
        },
        addProduct: (product: Omit<Product, "id">) =>
          set((state) => {
            const newProduct = { id: state.products.length + 1, ...product };
            return { products: [...state.products, newProduct] };
          }),
        setFilter: (filter: FilterType) => set(() => ({ filter: filter })),
        setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
        setPageSize: (size: number) => set(() => ({ pageSize: size })),
        setSearchText: (text: string) => set(() => ({ searchText: text })),
      }),

      {
        name: "product-store",
        partialize: (state) => ({
          favorites: state.favorites,
        }),
      },
    ),
  ),
);

export default useProductStore;
