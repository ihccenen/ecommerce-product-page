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
  price: string;
  total: string;
  quantity: number;
  thumbnail: string;
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
