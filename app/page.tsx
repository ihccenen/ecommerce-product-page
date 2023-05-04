'use client';

import styles from './page.module.css';
import Product from './components/Product';

const product = {
  name: 'Fall Limited Edition Sneakers',
  company: 'Sneaker Company',
  description: `These low-profile sneakers are your perfect casual wear companion. Featuring a 
  durable rubber outer sole, they’ll withstand everything the weather can offer.`,
  price: 125.00,
  discount: 50,
  originalPrice: 250,
  quantity: 0,
  images: {
    original: ['/image-product-1.jpg', '/image-product-2.jpg', '/image-product-3.jpg', '/image-product-4.jpg'],
    thumbnail: ['/image-product-1-thumbnail.jpg', '/image-product-2-thumbnail.jpg', '/image-product-3-thumbnail.jpg', '/image-product-4-thumbnail.jpg'],
  },
};

export default function Home() {
  return (
    <main className={styles.main}>
      <Product product={product} />
    </main>
  );
}
