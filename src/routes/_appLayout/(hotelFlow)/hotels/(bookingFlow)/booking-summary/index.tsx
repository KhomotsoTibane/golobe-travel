import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client, userQueryOptions } from "@/lib/api";
import PriceSummaryCard from "@/components/Cards/PriceSummaryCard";
import { buildingDark, locationDark } from "@/assets/icons";
import { useHotelStore } from "@/store/useHotelDetailsStore";
import { useFilterStore } from "@/store/useFilterStore";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { LoginSignupCard } from "@/components/Cards/LoginSignupCard";
import type { SearchHotelDetailResultsProps } from "@/types";
import { format as formatTz } from "date-fns-tz";
import BookingConfirmation from "@/components/Modal/BookingConfirmedModal";
import { useState } from "react";

export const Route = createFileRoute(
  "/_appLayout/(hotelFlow)/hotels/(bookingFlow)/booking-summary/"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { selectedHotel } = useHotelStore();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const timeZone = "Africa/Johannesburg";
  const { checkin, checkout, rooms, adults, children } = useFilterStore();
  const { data: auth } = useQuery(userQueryOptions);

  const cognitoId = auth?.userDetails.cognitoId!;

  const {
    hotelName,
    hotelLowestPrice,
    hotelStreetAddress,
    hotelCity,
    hotelNation,
    hotelCheckinTime,
    hotelCheckoutTime,
    hotelReviewsDesc,
    hotelReviewsScore,
    hotelReviewsTotal,
    hotelImageUrls,
    hotelId,
  } = selectedHotel as SearchHotelDetailResultsProps;

  console.log("checkin`1", checkin, "\ncheckout1", checkout);
  function toZuluDateTime(date: Date, time: string, timeZone = "Africa/Johannesburg") {
    // ⛳️ Split the time string — not the date!
    const [hours, minutes] = time.split(":").map(Number);

    // Copy date and apply time
    const combined = new Date(date);
    combined.setHours(hours);
    combined.setMinutes(minutes);
    combined.setSeconds(0);
    combined.setMilliseconds(0);

    // Format with timezone offset
    return formatTz(combined, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
  }

  const dateTimeCheckin1 = toZuluDateTime(checkin!, hotelCheckinTime!);
  const dateTimeCheckout1 = toZuluDateTime(checkout!, hotelCheckoutTime!);
  const { data } = useQuery({
    queryKey: [
      "booking-summary-price",
      checkin,
      checkout,
      adults,
      children,
      rooms,
      hotelLowestPrice,
    ],
    queryFn: async () =>
      client.getBookingTotalPrice({
        checkin: new Date(dateTimeCheckin1),
        checkout: new Date(dateTimeCheckout1),
        children: children!.toString(),
        adults: adults!.toString(),
        basePrice: hotelLowestPrice,
        rooms: rooms!.toString(),
        checkinTime: hotelCheckinTime!,
        checkoutTime: hotelCheckoutTime!,
      }),
  });

  console.log("checkin2", checkin, "\ncheckout2", checkout);

  const dateTimeCheckin = toZuluDateTime(checkin!, hotelCheckinTime!);
  const dateTimeCheckout = toZuluDateTime(checkout!, hotelCheckoutTime!);
  const {
    mutate: confirmBooking,
    isPending,
    data: bookingResponse,
  } = useMutation({
    mutationKey: ["booking-confirmation"],
    mutationFn: async () =>
      client.confirmBooking({
        userId: cognitoId,
        hotelId: hotelId,
        checkin: dateTimeCheckin,
        checkout: dateTimeCheckout,
        children: children!.toString(),
        adults: adults!.toString(),
        basePrice: hotelLowestPrice,
        rooms: rooms!,
        serviceFee: data?.serviceFee!,
        taxes: data?.taxes!,
        checkinTime: hotelCheckinTime!,
        checkoutTime: hotelCheckoutTime!,
      }),
    onSuccess: (response) => {
      setIsOpen(true);

      console.log("confirmed!", response);
    },
    onError: (error) => {
      console.error("failed", error);
    },
  });

  return (
    <section className=" relative size-full mt-8 max-w-screen-2xl mx-auto">
      <BookingConfirmation isOpen={isOpen} setIsOpen={setIsOpen} />;
      <div className="grid grid-cols-3 gap-10 ">
        <div className=" col-span-2 gap-4 flex flex-col ">
          <div className="card-shadow flex flex-col p-6 rounded-xl  max-h-80">
            <div className="flex justify-between">
              <h4>{hotelName}</h4>
              <div>
                <h5 className="montserrat__bold relative w-full text-accent-400">
                  {formatCurrency(hotelLowestPrice)}
                  <span className="montserrat__bold small">/night</span>
                </h5>{" "}
                <p className="small montserrat__medium w-full text-black/75 lg:text-right">
                  excl.tax
                </p>
              </div>
            </div>

            <div>
              <div className="montserrat__medium flex flex-col gap-3 rounded-xl p-4 border border-primary-200 shadow-md items-center justify-center">
                <h6 className="trade__bold">{hotelName}</h6>
                <div className="flex gap-px">
                  <img src={locationDark} width={16} height={16} alt="coffee icon" />
                  <p className="smallest montserrat__medium  text-black/75">
                    {" "}
                    {hotelStreetAddress}, {hotelCity}, {hotelNation}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex justify-center items-center">
                <CheckingCard date={checkin!} action={"check-in"} />
                {hotelCheckinTime}
              </div>
              <img
                src={buildingDark}
                width={48}
                height={48}
                alt={"building"}
                className=" rounded-lg"
              />
              <div className="flex justify-center items-center">
                <CheckingCard date={checkout!} action={"check-out"} />
                {hotelCheckoutTime}
              </div>
            </div>
          </div>
          <div>
            <LoginSignupCard onConfirmBooking={confirmBooking} />
          </div>
        </div>

        {data ? (
          <div className="col-span-1">
            <PriceSummaryCard
              hotelReviewsDesc={hotelReviewsDesc}
              hotelReviewsScore={hotelReviewsScore}
              hotelReviewsTotal={hotelReviewsTotal}
              basePrice={data.basePrice}
              discount={0}
              taxes={data.taxes}
              total={data.total}
              hotelImageUrl={hotelImageUrls[0]}
              hotelName={hotelName}
              hotelRoomType="yeah"
              serviceFee={data.serviceFee}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

interface CheckingCardProps {
  date: Date;
  action: string;
}

export const CheckingCard = ({ date, action }: CheckingCardProps) => {
  return (
    <div className="p-4">
      <p className="font-semibold">{format(date, "EEEE, MMMM d")}</p>
      <p className=" capitalize text-muted-foreground">{action}</p>
    </div>
  );
};
