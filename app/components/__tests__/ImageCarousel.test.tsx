import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ImageCarousel from '../ImageCarousel';

const product = {
  name: 'name',
  images: {
    original: ['/1.png', '/2.png', '/3.png'],
    thumbnail: ['/1.png', '/2.png', '/3.png'],
  },
};

describe('product', () => {
  it('renders all thumbnails buttons', () => {
    render(<ImageCarousel
      name={product.name}
      images={product.images}
    />);

    const thumbnailButtons = screen.getAllByTestId('thumbnail-btn');

    expect(thumbnailButtons).toHaveLength(product.images.thumbnail.length);
  });

  it('thumbnail button does not have selected class name', () => {
    render(<ImageCarousel
      name={product.name}
      images={product.images}
    />);

    const thumbnailButtons = screen.getAllByTestId('thumbnail-btn');

    expect(thumbnailButtons[thumbnailButtons.length - 1].className).not.toContain('selected');
  });

  it('thumbnail button of the selected image have selected class name', () => {
    render(<ImageCarousel
      name={product.name}
      images={product.images}
    />);

    const thumbnailButtons = screen.getAllByTestId('thumbnail-btn');

    expect(thumbnailButtons[0].className).toContain('selected');
  });

  it('thumbnail button that is clicked has the selected class name', async () => {
    const user = userEvent.setup();

    render(<ImageCarousel
      name={product.name}
      images={product.images}
    />);

    const thumbnailButtons = screen.getAllByTestId('thumbnail-btn');

    user.click(thumbnailButtons[thumbnailButtons.length - 1]);

    await waitFor(() => expect(thumbnailButtons[thumbnailButtons.length - 1].className).toContain('selected'));
  });

  it('calls click handler', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<ImageCarousel
      name={product.name}
      images={product.images}
      handleOpenClick={handleClick}
    />);

    const img = screen.getByTestId('product-img');

    user.click(img);

    await waitFor(() => expect(handleClick).toHaveBeenCalledTimes(1));
  });
});
