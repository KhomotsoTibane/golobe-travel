import type { PopularDestinationCardProps } from "@/types";
import { Link } from "@tanstack/react-router";

const PopularDestinationCard = ({ imgUrl, city, location }: PopularDestinationCardProps) => {
  const categories = ["Flights", "hotels", "resorts"];
  return (
    <Link to="/" className="hover:scale-105">
      <article className="card-shadow flex h-[122px] gap-4 rounded-2xl bg-white p-4 items-center">
        <div className="size-full max-h-[90px] max-w-[90px]">
          <img
            src={"https://placehold.co/400"}
            width={90}
            height={90}
            alt={location}
            className="size-full rounded-lg"
          />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <p className="montserrat__semibold text-black/70">{location}</p>
          <p className="montserrat__medium small">{categories.join(" · ")}</p>
        </div>
      </article>
    </Link>
  );
};

export default PopularDestinationCard;
