'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';

type Product = {
  name: string;
  company: string;
  description: string;
  price: number;
  discount?:number;
  discountedPrice?: number;
  quantity: number;
  images: {
    original: string[];
    thumbnail: string[];
  };
};

export const CartContext = createContext<{
  cart: Product[];
  setCart: Dispatch<SetStateAction<Product[]>>;
}>({
  cart: [],
  setCart: () => {},
});

export default function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, setCart] = useState<Product[]>([]);

  const cartMemo = useMemo(
    () => ({
      cart,
      setCart,
    }),
    [cart, setCart],
  );

  return (
    <CartContext.Provider value={cartMemo}>{children}</CartContext.Provider>
  );
}
