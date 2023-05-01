import { useContext, useState } from 'react';
import Image from 'next/image';
import { CartContext } from '../CartContext';
import styles from './Cart.module.css';

export default function Cart() {
  const [open, setOpen] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const handleClick = () => setOpen((prev) => !prev);

  const handleRemoveProductClick = (index: number) => {
    setCart((prev) => prev.filter((item, i) => i !== index));
  };

  return (
    <div className={styles.cart}>
      <button type="button" aria-label="your cart" onClick={handleClick}>
        <Image
          className={styles['cart-icon']}
          src="icon-cart.svg"
          width={22}
          height={20}
          quality={100}
          alt=""
          aria-hidden
        />
        {cart.length > 0 && (
          <div className={styles.quantity} data-testid="quantity">
            <p>{cart.reduce((acc, curr) => curr.quantity + acc, 0)}</p>
          </div>
        )}
      </button>
      {open && (
        <div className={styles['cart-items-container']} data-testid="cart" onBlur={handleClick}>
          <div className={styles['cart-top']}>
            <p className={styles.bold}>Cart</p>
          </div>
          <div className={styles['products-wrapper']}>
            {cart.length < 1 ? (
              <div className={styles['empty-cart']}>
                <p>Your cart is empty</p>
              </div>
            ) : (
              cart.map(({
                name, price, total, quantity, thumbnail,
              }, index) => (
                <div className={styles.product} key={Math.random()}>
                  <Image
                    className={styles.thumbnail}
                    src={thumbnail}
                    width={176}
                    height={176}
                    quality={100}
                    alt=""
                  />
                  <div>
                    <p>{name}</p>
                    <p>
                      {`${price} x ${quantity} `}
                      <span className={styles.bold}>{total}</span>
                    </p>
                  </div>
                  <button
                    className={styles['remove-product-btn']}
                    type="button"
                    aria-label="remove product"
                    onClick={() => handleRemoveProductClick(index)}
                  >
                    <Image src="/icon-delete.svg" width={14} height={16} alt="" quality={100} />
                  </button>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <button className={styles['checkout-btn']} type="button">
              Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
