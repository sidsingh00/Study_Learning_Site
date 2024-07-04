import React, { FC } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

type Props = {
  rating: number;
};

const Ratings: FC<Props> = ({ rating }) => {
  const stars = [];
  const startColor = "#f6b100";
  const startClasses = "mr-2 cursor-pointer";

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color={startColor}
          className={startClasses}
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          key={i}
          size={17}
          color={startColor}
          className={startClasses}
        />
      );
    } else {
      stars.push(
        <AiOutlineStar
          key={i}
          size={20}
          color={startColor}
          className={startClasses}
        />
      );
    }
  }
  return <div className="flex mt-1 ml-2 800px:mt-0 800px:ml-0">{stars}</div>;
};

export default Ratings;
