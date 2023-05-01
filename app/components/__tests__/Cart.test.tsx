/* eslint-disable react/jsx-no-constructed-context-values */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartContext } from '@/app/CartContext';
import Cart from '../Cart';

describe('cart', () => {
  it('does not renders quantity if the cart is empty', () => {
    render(
      <CartContext.Provider value={{ cart: [], setCart: () => {} }}>
        <Cart />
      </CartContext.Provider>,
    );

    const quantity = screen.queryByTestId('quantity');

    expect(quantity).not.toBeInTheDocument();
  });

  it('shows the right number of products in the cart', () => {
    const cart = [
      {
        name: 'Fall Limited Edition Sneakers',
        price: '$125.00',
        total: '$375.00',
        quantity: 3,
        thumbnail: '/image-product-1-thumbnail.jpg',
      },
    ];

    render(
      <CartContext.Provider value={{ cart, setCart: () => {} }}>
        <Cart />
      </CartContext.Provider>,
    );

    const quantity = screen.queryByTestId('quantity');

    expect(quantity).toHaveTextContent(
      cart.reduce((acc, curr) => curr.quantity + acc, 0).toString(),
    );
  });

  it('does not shows cart items when not clicked', () => {
    render(
      <CartContext.Provider value={{ cart: [], setCart: () => {} }}>
        <Cart />
      </CartContext.Provider>,
    );

    const cart = screen.queryByTestId('cart');

    expect(cart).not.toBeInTheDocument();
  });

  it('shows cart items when clicked', async () => {
    const user = userEvent.setup();

    render(
      <CartContext.Provider value={{ cart: [], setCart: () => {} }}>
        <Cart />
      </CartContext.Provider>,
    );

    const btn = screen.getByRole('button');

    await user.click(btn);

    await waitFor(() => expect(screen.queryByTestId('cart')).toBeInTheDocument());
  });
});
