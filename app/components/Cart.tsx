import {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { CartContext } from '../CartContext';
import styles from './Cart.module.css';

export default function Cart() {
  const [open, setOpen] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const ref = useRef<any>();

  const handleClick = () => setOpen((prev) => !prev);

  const handleRemoveProductClick = (index: number) => {
    setCart((prev) => prev.filter((item, i) => i !== index));
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  };

  useEffect(() => {
    window.addEventListener('pointerdown', handleClickOutside);

    return () => window.removeEventListener('pointerdown', handleClickOutside);
  }, [ref]);

  return (
    <div ref={ref} className={styles.cart}>
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
                <p>Your cart is empty.</p>
              </div>
            ) : (
              cart.map(({
                name, price, quantity, images,
              }, index) => (
                <div className={styles.product} key={Math.random()}>
                  <Image
                    className={styles.thumbnail}
                    src={images.thumbnail[0]}
                    width={176}
                    height={176}
                    quality={100}
                    alt=""
                  />
                  <div>
                    <p>{name}</p>
                    <p>
                      {`$${price.toFixed(2)} x ${quantity} `}
                      <span className={styles.bold}>{`$${(price * quantity).toFixed(2)}`}</span>
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
            <button className={styles['checkout-btn']} type="button" onClick={handleClick}>
              Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
