import { Link, Route, useRouteContext } from "@tanstack/react-router";
import { Button } from "../ui/button";
import type { SearchResultsProps } from "@/types";
import { coffeeDark, heart, locationDark, salmonStar } from "@/assets/icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client, userQueryOptions } from "@/lib/api";
import { formatCurrency } from "@/lib/utils";

const SearchHotelResultsCard = ({
  hotelId,
  hotelName,
  hotelStars,
  hotelReviewsScore,
  hotelReviewsTotal,
  hotelReviewsDesc,
  hotelLowestPrice,
  hotelImageUrls,
  hotelNation,
  hotelCity,
  hotelStreetAddress,
  totalAmenities,
  rateFrequency,
}: SearchResultsProps) => {
  const array = Array.from({ length: hotelStars }, (_, index) => index);
  const city = hotelCity || "";

  const { data } = useQuery(userQueryOptions);
  const queryClient = useQueryClient();

  const toggleFavoriteMutation = useMutation({
    mutationKey: ["toggle-user-favorites"],
    mutationFn: async (hotelId: string) => {
      return client.toggleUserFavoriteHotel({
        id: data?.cognitoInfo.userId!,
        hotelId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-favorites", data?.cognitoInfo.userId!] });
    },
  });

  console.log("result", data);

  return (
    <article className="card-shadow bg-white rounded-xl w-full mb-5">
      <div className="relative">
        <div className="w-full h-48 relative rounded-t-xl overflow-hidden">
          <img
            src={hotelImageUrls}
            width={900}
            height={900}
            alt={"hotel image"}
            className="size-full"
          />
        </div>
      </div>
      <div className="p-4">
        <h6 className="trade__bold">{hotelName}</h6>
        <div className="flex gap-px">
          <img src={locationDark} width={16} height={16} alt="coffee icon" />
          <p className="smallest montserrat__medium  text-black/75">
            {hotelStreetAddress}, {hotelCity}, {hotelNation}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex">
            {array.map((star, index) => (
              <img
                key={index}
                src={salmonStar}
                width={16}
                height={16}
                alt="star"
                className="mx-px"
              />
            ))}
          </div>
          <div className="flex gap-1">
            <img src={coffeeDark} width={16} height={16} alt="coffee icon" />
            <p className="smallest montserrat__bold">{totalAmenities}+ Aminities</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center">
          <div className="flex items-center mb-2 gap-px">
            <span className="montserrat__bold">{hotelReviewsScore}</span>
            <span>{hotelReviewsDesc}</span>
            <span className="ml-1">({hotelReviewsTotal} Reviews)</span>
          </div>
          <p className="mb-3 text-accent-400">
            <span className="smallest montserrat__medium w-full text-left text-black/75">
              from{" "}
            </span>
            {formatCurrency(hotelLowestPrice)} <span className=""> /{rateFrequency}</span>
          </p>
        </div>
        <hr className="h-1" />
        <div className="flex items-center gap-4 text-gray-600 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="border-primary-400"
            onClick={() => toggleFavoriteMutation.mutate(hotelId)}
          >
            <img src={heart} width={16} height={16} alt="heart-icon" />
          </Button>

          <Button asChild variant="default" className="montserrat__semibold text-black grow">
            <Link
              to={`/hotels/search-results/$city/$hotelName`}
              params={{ city: city, hotelName: hotelName }}
              search={(prev) => prev}
            >
              View place
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};

export default SearchHotelResultsCard;
