'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Cart from './Cart';
import styles from './Header.module.css';

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen((prev) => !prev);

  return (
    <header className={`${styles.header} ${styles.flex} ${styles.center}`}>
      <div className={`${styles['header-left']} ${styles.flex} ${styles.center}`}>
        <button className={styles['menu-btn']} type="button" aria-label="nav" onClick={handleClick}>
          <Image src="/icon-menu.svg" width={16} height={15} quality={100} alt="" />
        </button>
        <div>
          <Link href="/" aria-label="sneakers">
            <Image src="/logo.svg" width="138" height="20" alt="" aria-hidden quality={100} />
          </Link>
        </div>
        <ul className={`${styles.nav} ${styles.flex} ${open ? '' : styles.hidden}`}>
          <button
            className={styles['close-btn']}
            type="button"
            aria-label="close nav"
            onClick={handleClick}
          >
            <Image src="/icon-close.svg" width={14} height={15} quality={100} alt="" aria-hidden />
          </button>
          <li>
            <Link href="/">Collections</Link>
          </li>
          <li>
            <Link href="/">Men</Link>
          </li>
          <li>
            <Link href="/">Women</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
        </ul>
        {open && <div className={styles.overlay} />}
      </div>
      <div className={`${styles['header-right']} ${styles.flex} ${styles.center}`}>
        <Cart />
        <Link href="/">
          <Image
            className={styles.pic}
            src="/image-avatar.png"
            width={100}
            height={100}
            alt="profile avatar"
            quality={100}
          />
        </Link>
      </div>
    </header>
  );
}
