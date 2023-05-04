import { useState } from 'react';
import Image from 'next/image';
import styles from './ImageCarousel.module.css';

type ImageCarouselProps = {
  name: string;
  images: {
    original: string[];
    thumbnail: string[];
  };
  handleOpenClick?: () => void;
  handleCloseClick?: () => void;
  className?: string;
};

export default function ImageCarousel({
  name,
  images,
  handleOpenClick = () => {},
  handleCloseClick = () => {},
  className = '',
}: ImageCarouselProps) {
  const [selectedImageIndex, setSelectedImage] = useState(0);

  const handleSelectClick = (index: number) => setSelectedImage(index);

  const handlePreviousImageClick = () => {
    setSelectedImage((prev) => (prev - 1 < 0 ? images.thumbnail.length - 1 : prev - 1));
  };

  const handleNextImageClick = () => {
    setSelectedImage((prev) => (prev + 1 >= images.thumbnail.length ? 0 : prev + 1));
  };

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div className={styles['product-img-wrapper']}>
        {className.includes('lightbox') && (
        <button className={styles['close-lightbox-btn']} type="button" aria-label="close lightbox" onClick={handleCloseClick}>
          <Image src="/icon-close.svg" width={14} height={15} alt="" aria-hidden />
        </button>
        )}
        <button
          className={styles['previous-btn']}
          type="button"
          aria-label="previous image"
          onClick={handlePreviousImageClick}
        >
          <Image src="/icon-previous.svg" width={12} height={18} alt="" aria-hidden />
        </button>
        <Image
          className={styles['product-img']}
          src={images.original[selectedImageIndex]}
          width={1000}
          height={1000}
          quality={100}
          alt={name}
          onClick={handleOpenClick}
          data-testid="product-img"
        />
        <button
          className={styles['next-btn']}
          type="button"
          aria-label="next image"
          onClick={handleNextImageClick}
        >
          <Image src="/icon-next.svg" width={12} height={18} alt="" aria-hidden />
        </button>
      </div>
      <div className={`${styles['thumbnails-container']}`}>
        {images.thumbnail.map((image, index) => (
          <button
            key={image}
            className={`${styles['thumbnail-btn']} ${
              index === selectedImageIndex ? styles['selected-thumbnail'] : ''
            }`}
            type="button"
            onClick={() => handleSelectClick(index)}
            aria-label={`image ${index + 1} of ${images.thumbnail.length}`}
            data-testid="thumbnail-btn"
          >
            <Image src={image} width={176} height={176} quality={100} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
