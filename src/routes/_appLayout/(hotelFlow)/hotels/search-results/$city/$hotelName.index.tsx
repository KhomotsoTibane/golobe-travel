import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { heart, locationDark, salmonStar, sparkle } from "@/assets/icons";
import { client } from "@/lib/api";
import SpringModal from "@/components/Modal/AmenitiesModal";
import { z } from "zod";
import { ImageCarousel } from "@/components/Carousel/ImageCarousel";
import { useFilterStore } from "@/store/useFilterStore";

export const Route = createFileRoute(
  "/_appLayout/(hotelFlow)/hotels/search-results/$city/$hotelName/"
)({
  component: HotelDetails,
});

function HotelDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const { hotelName, city } = Route.useParams();
  const test = Route.useParams();

  const { data, error } = useQuery({
    queryKey: ["hotel-details", hotelName],
    queryFn: async () => client.getHotelDetails({ hotelName }),
  });

  const {
    rating,

    price,
    amenities,
    adults,
    checkin,
    checkout,
    children,
    location,
    setFilters,
  } = useFilterStore();

  console.log(
    "saying this form hotel search baba",
    "rating-",
    rating,

    "price-",
    price,
    "amenities-",
    amenities,
    "adults-",
    adults,
    "checkin-",
    checkin,
    "checkout-",
    checkout,
    "children-",
    children,
    "location-",
    location
  );

  if (!data) return <div>No results found</div>;
  console.log("details dayda", data);
  const array = Array.from({ length: 5 }, (_, index) => index);
  const rooms = [
    {
      id: 1,
      name: "Superior room – 1 double bed or 2 twin beds",
      price: 240,
    },
    {
      id: 2,
      name: "Superior room – City view – 1 double bed or 2 twin beds",
      price: 280,
    },
    {
      id: 3,
      name: "Superior room – City view – 1 double bed or 2 twin beds",
      price: 320,
    },
    {
      id: 4,
      name: "Superior room – City view – 1 double bed or 2 twin beds",
      price: 350,
    },
  ];
  const reviewsData = [
    {
      id: 1,
      rating: 5.0,
      ratingLabel: "Amazing",
      name: "Omar Siphron",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "2 days ago",
    },
    {
      id: 2,
      rating: 5.0,
      ratingLabel: "Amazing",
      name: "Cristofer Ekstrom Bothman",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "3 days ago",
    },
    {
      id: 3,
      rating: 5.0,
      ratingLabel: "Amazing",
      name: "Kaiya Lubin",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "5 days ago",
    },
    {
      id: 4,
      rating: 5.0,
      ratingLabel: "Amazing",
      name: "Erin Septimus",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "1 week ago",
    },
    {
      id: 5,
      rating: 5.0,
      ratingLabel: "Amazing",
      name: "Terry George",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "2 weeks ago",
    },
  ];

  const previewAmenities = data.hotelAmenities?.slice(0, 9) || [];
  const length = data.hotelAmenities?.length! - previewAmenities.length;
  const midIndex = Math.ceil((previewAmenities.length + 1) / 2);
  const leftColumn = previewAmenities.slice(0, midIndex);
  const rightColumn = previewAmenities.slice(midIndex);

  return (
    <div className="size-full mt-8 max-w-screen-2xl mx-auto">
      <div className="">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/hotels" className="text-accent-500">
                  Hotels
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link
                  to={`/hotels/search-results/$city`}
                  params={{ city: city }}
                  className="text-accent-500"
                >
                  {city}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{hotelName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mt-8 h-full gap-6">
        <div className="flex w-full justify-between gap-8">
          <div className="flex items-center justify-center gap-8">
            <h6 className="trade__bold">{data.hotelName}</h6>
            <div className="flex items-center justify-center">
              {array.map((star) => (
                <img
                  key={""}
                  src={salmonStar}
                  width={16}
                  height={16}
                  alt="star"
                  className="mx-px"
                />
              ))}
              <p className="smallest montserrat__medium ml-1 text-center">
                {data.hotelStars} Star Hotel
              </p>
            </div>
          </div>
          <div className="">
            <h5 className="montserrat__bold relative w-full text-accent-400">
              {data.hotelLowestPrice}
              <span className="montserrat__bold small">/{"night"}</span>
            </h5>
          </div>
        </div>
        <div className="flex w-full justify-between gap-8">
          <div className="flex flex-col justify-center gap-2">
            <div className="flex gap-px">
              <img src={locationDark} width={16} height={16} alt="coffee icon" />
              <p className="smallest montserrat__medium  text-black/75">
                {data.hotelStreetAddress}, {data.hotelCity}, {data.hotelNation}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <p className="flex size-8 items-center justify-center rounded-[4px] border border-primary-400 px-4">
                {data.hotelReviewsScore}
              </p>
              <p className="smallest">
                <span className="montserrat__bold ">{"Very Good"}</span> {data.hotelReviewsTotal}{" "}
                reviews
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-primary-400">
              <img src={heart} width={16} height={16} alt="heart-icon" />
            </Button>
            <Link to={`/booking`} search={(prev) => prev}>
              <Button variant="default" className="montserrat__semibold w-full text-black">
                Book Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="relative mt-4 grid grid-cols-12 gap-1.5 overflow-hidden rounded-xl">
            {/* Left large image */}
            <div className="col-span-6">
              <img
                src={data.hotelAdditionalImageUrls[0].dynamic}
                alt="Main"
                className="h-full w-full object-cover rounded-l-xl"
              />
            </div>

            {/* Right column (4 smaller images) */}
            <div className="col-span-6 grid grid-cols-2 gap-1.5">
              {data.hotelAdditionalImageUrls.slice(1, 5).map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img.dynamic}
                    alt={`Photo ${i}`}
                    className="h-full w-full object-cover"
                  />

                  {/* View All Button on the bottom-right image */}
                  {i === 3 && (
                    <Button
                      variant="default"
                      className="montserrat__semibold absolute bottom-2 right-2 z-10 text-black"
                      onClick={() => setIsCarouselOpen(true)}
                    >
                      View all photos
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isCarouselOpen && (
            <div className="absolute inset-0 z-40 my-x bg-black/90 rounded-xl overflow-hidden flex items-center justify-center border-2 border-accent-900">
              <button
                onClick={() => setIsCarouselOpen(false)}
                className="absolute top-4 right-4 text-white text-2xl z-50"
              >
                ✕
              </button>
              <ImageCarousel images={data.hotelAdditionalImageUrls!} />
            </div>
          )}
        </div>

        <hr className="my-16 h-1" />
        <div>
          <div>
            <h5>Overview</h5>
            <p>{data.hotelHotelDescription}</p>
          </div>
          <div className="my-8 flex gap-4">
            <div className="flex h-36 w-40 flex-col items-start gap-4 rounded-xl bg-primary-400 p-4">
              <h4 className="trade__bold">{4.5}</h4>
              <div>
                <p className="montserrat__bold flex flex-col">{data.hotelReviewsDesc}</p>
                <small className="small montserrat__medium">{data.hotelReviewsTotal} reviews</small>
              </div>
            </div>
            {["lprem ipsom", "Near nightlife", "Near theater", "Clean Hotel"].map((near, index) => (
              <div
                key={index}
                className="flex h-36 w-40 flex-col items-start justify-between rounded-xl border border-primary-400 p-4"
              >
                <img key={""} src={sparkle} width={32} height={32} alt="star" className="mx-px" />
                <p className="montserrat__medium">{near}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-16 h-1" />

        <div className="">
          <h6 className="trade__bold mb-8">Available Rooms</h6>

          {rooms.map((room) => (
            <>
              <div key={room.id} className="flex justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src="https://placehold.co/48x48/png"
                    width={48}
                    height={48}
                    alt="star"
                    className="rounded-[4px]"
                  />
                  <p className="montserrat__medium">{room.name}</p>
                </div>
                <div className="flex items-center gap-16">
                  <h5 className="montserrat__semibold">
                    {room.price}
                    <small className="">/night</small>
                  </h5>
                  <Link to={`/`}>
                    <Button variant="default" className="montserrat__semibold text-black">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
              <hr className="my-4 h-1" />
            </>
          ))}
        </div>

        <hr className="my-16 h-1" />

        <div>
          <p>Location/Map</p>
          {/* <MapDetails properties={data} error={error} /> */}
          <div className="flex gap-px">
            <img src={locationDark} width={16} height={16} alt="coffee icon" />
            <p className="smallest montserrat__medium  text-black/75">
              {data.hotelStreetAddress}, {data.hotelCity}, {data.hotelNation}
            </p>
          </div>
        </div>

        <hr className="my-16 h-1" />

        <div className="flex">
          {[leftColumn, rightColumn].map((column, index) => (
            <div key={index} className="flex-1">
              {column.map((amenity) => (
                <div key={amenity} className="mb-2 flex items-center">
                  <p className="montserrat__medium"> * {amenity}</p>
                </div>
              ))}
              {/* ✅ Add 'See All' button only in the right column */}
              {index === 1 && (
                <div className="">
                  <button
                    onClick={() => setIsOpen(true)}
                    className="text-accent-600 montserrat__medium"
                  >
                    + {length} more
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} amenities={data.hotelAmenities!} />
        <hr className="my-16 h-1" />
        <div>
          <h5 className="trade__medium">Reviews</h5>
          <div className="flex h-16 w-60 items-center gap-4 py-4">
            <h2 className="trade__bold">{data.hotelReviewsScore}</h2>
            <div className="flex flex-col">
              <p className="montserrat__bold flex flex-col">{data.hotelReviewsDesc}</p>
              <small className="smallest montserrat__normal">
                {data.hotelReviewsTotal} verified reviews
              </small>
            </div>
          </div>
          <hr className="my-6 h-1" />
          <div className="space-y-6">
            {reviewsData.map((review) => (
              <div key={review.id} className="flex gap-4 border-b pb-4">
                <div>
                  <img
                    src="https://placehold.co/45x45/png"
                    width={45}
                    height={45}
                    alt="star"
                    className="rounded-full"
                  />
                </div>

                <div className="mb-2 flex flex-col gap-2 text-sm">
                  <div className="flex gap-2">
                    <small className="montserrat__semibold">
                      {review.rating} {review.ratingLabel}
                    </small>
                    <small className="font-semibold">{review.name}</small>
                  </div>

                  <p className=" text-sm leading-relaxed">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>1</PaginationItem>
              <PaginationItem>of</PaginationItem>
              <PaginationItem>50</PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
