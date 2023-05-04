'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import styles from './Product.module.css';
import { CartContext } from '../CartContext';

type ProductProps = {
  name: string;
  company: string;
  description: string;
  price: number;
  discount?: number;
  quantity: number;
  originalPrice: number;
  images: {
    original: string[];
    thumbnail: string[];
  };
};

export default function Product({ product }: { product: ProductProps }) {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const { setCart } = useContext(CartContext);
  const {
    name,
    company,
    description,
    price,
    discount = '',
    originalPrice,
    images,
  } = product;

  const handleIncreaseClick = () => setValue((prev) => prev + 1);

  const handleDecreaseClick = () => setValue((prev) => (prev - 1 < 0 ? 0 : prev - 1));

  const handleAddToCartClick = () => {
    if (value < 1) return;

    setCart((prev) => prev.concat({ ...product, quantity: value }));
  };

  const handleLightboxClick = () => {
    const { width } = window.screen;

    if (!open && width < 799) return;

    setOpen((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <ImageCarousel
        className={styles.carousel}
        name={name}
        images={images}
        handleOpenClick={handleLightboxClick}
      />
      <div className={styles['product-info']}>
        <p className={styles.company}>{company}</p>
        <h1 className={styles['product-name']}>{name}</h1>
        <p className={styles['product-description']}>{description}</p>
        <div className={styles['prices-wrapper']}>
          <div className={styles['price-top-left']}>
            <p className={styles.price}>{`$${price.toFixed(2)}`}</p>
            <span className={styles.discount}>{`${discount}%`}</span>
          </div>
          {discount && <p className={styles['original-price']}>{`$${originalPrice.toFixed(2)}`}</p>}
        </div>
        <div className={styles['bottom-wrapper']}>
          <div className={styles.quantity}>
            <button
              className={styles.operator}
              type="button"
              aria-label="decrease quantity"
              onClick={handleDecreaseClick}
            >
              <Image
                src="/icon-minus.svg"
                width={12}
                height={12}
                quality={100}
                alt=""
                aria-hidden
              />
            </button>
            <input className={styles['quantity-input']} type="text" value={value} disabled />
            <button
              className={styles.operator}
              type="button"
              aria-label="increase quantity"
              onClick={handleIncreaseClick}
            >
              <Image src="/icon-plus.svg" width={12} height={12} quality={100} alt="" aria-hidden />
            </button>
          </div>
          <button
            className={styles['add-to-cart-btn']}
            type="button"
            onClick={handleAddToCartClick}
          >
            <Image src="/icon-cart.svg" width={22} height={20} quality={100} alt="" aria-hidden />
            Add to cart
          </button>
        </div>
      </div>
      {open && (
      <>
        <ImageCarousel
          className={styles.lightbox}
          name={name}
          images={images}
          handleCloseClick={handleLightboxClick}
        />
        <div className={styles.overlay} />
      </>
      )}
    </div>
  );
}
