import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { motion, useMotionValue } from "framer-motion";

// const imgs = [
//   "/imgs/nature/1.jpg",
//   "/imgs/nature/2.jpg",
//   "/imgs/nature/3.jpg",
//   "/imgs/nature/4.jpg",
//   "/imgs/nature/5.jpg",
//   "/imgs/nature/6.jpg",
//   "/imgs/nature/7.jpg",
// ];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

export const SwipeCarousel = ({ images }: any) => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === images.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className=" relative w-full h-full  flex flex-col justify-center items-center overflow-hidden backdrop-blur rounded-xl">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex  w-full  justify-start cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} images={images} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} images={images} />
      {/* <GradientEdges /> */}
    </div>
  );
};

const Images = ({ imgIndex, images }: { imgIndex: number; images: { dynamic: string }[] }) => {
  return (
    <>
      {images.map((img, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${img.dynamic})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video w-full shrink-0 rounded-xl bg-neutral-800 object-cover"
          />
        );
      })}
    </>
  );
};

const Dots = ({
  imgIndex,
  setImgIndex,
  images,
}: {
  imgIndex: number;
  setImgIndex: Dispatch<SetStateAction<number>>;
  images: { dynamic: string }[];
}) => {
  return (
    <div className=" absolute bottom-0 mt-4 flex w-full justify-center gap-2">
      {images.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-accent-50" : "bg-primary-500"
            }`}
          />
        );
      })}
    </div>
  );
};

const GradientEdges = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-r from-neutral-950/50 to-neutral-950/0" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px] bg-gradient-to-l from-neutral-950/50 to-neutral-950/0" />
    </>
  );
};
