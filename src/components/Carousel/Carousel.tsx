import './Carousel.scss';
import { State } from '../../types/State';

function findNumImage(image: string): number {
  return +image.slice(image.lastIndexOf('/') + 1, image.lastIndexOf('.'));
}

type CarouselProps = State & {
  onChangeoffSet: (offSet: number) => void;
};

enum ScrollDirections {
  prev,
  next,
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  offSet,
  onChangeoffSet,
  infinity,
}) => {
  function scrolling(direction: ScrollDirections) {
    const imagesList =
      document.querySelector<HTMLUListElement>('.Carousel__list');

    if (!imagesList) {
      return;
    }

    const maxOffset = (images.length - frameSize) * itemWidth;
    let newOffset = offSet;

    if (direction === ScrollDirections.next) {
      newOffset = offSet + step * itemWidth;

      if (infinity) {
        if (newOffset > maxOffset) {
          newOffset = 0;
        }
      } else {
        if (newOffset > maxOffset) {
          newOffset = maxOffset;
        }
      }
    } else if (direction === ScrollDirections.prev) {
      newOffset = offSet - step * itemWidth;

      if (infinity) {
        if (newOffset < 0) {
          newOffset = maxOffset;
        }
      } else {
        if (newOffset < 0) {
          newOffset = 0;
        }
      }
    }

    imagesList.style.transform = `translateX(-${newOffset}px)`;
    imagesList.style.transition = `transform ${animationDuration}ms`;

    onChangeoffSet(newOffset);
  }

  return (
    <div className="Carousel">
      <button
        className="Carousel__button"
        type="button"
        disabled={offSet === 0 && !infinity}
        onClick={() => {
          scrolling(ScrollDirections.prev);
        }}
      >
        Prev
      </button>

      <div
        className="Carousel__list-container"
        style={{ width: frameSize * itemWidth + 'px' }}
      >
        <ul
          className="Carousel__list"
          style={{
            transition: `transform ${animationDuration}ms`,
            width: itemWidth * images.length + 'px',
            transform: `translateX(-${offSet}px)`,
          }}
        >
          {images.map(img => (
            <li key={findNumImage(img)} className="Carousel__link">
              <img
                src={img}
                alt="1"
                className="Carousel__image"
                width={itemWidth}
              />
            </li>
          ))}
        </ul>
      </div>

      <button
        className="Carousel__button"
        type="button"
        data-cy="next"
        disabled={
          offSet >= (images.length - frameSize) * itemWidth && !infinity
        }
        onClick={() => {
          scrolling(ScrollDirections.next);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
