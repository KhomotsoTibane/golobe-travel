import { formatCurrency } from "@/lib/utils";
import type { BookingSummaryCardProps } from "@/types";

const PriceSummaryCard = ({
  hotelImageUrl,
  hotelName,
  hotelRoomType,
  hotelReviewsScore,
  hotelReviewsTotal,
  hotelReviewsDesc,
  basePrice,
  discount,
  taxes,
  serviceFee,
  total,
}: BookingSummaryCardProps) => {
  return (
    <div className="bg-white">
      <article className="card-shadow flex flex-col gap-2 overflow-hidden rounded-2xl lg:h-[450px] lg:min-h-[300px]  lg:gap-6 p-6">
        <div className=" flex gap-6">
          <img
            src={hotelImageUrl}
            width={900}
            height={900}
            alt={"hotel image"}
            className="size-full max-h-[120px] max-w-[120px] rounded-xl"
          />

          <div className="flex w-full flex-col gap-2 border-accent-600">
            <p className="font-trade__normal font-bold">{hotelName}</p>
            <p className="smallest text-black/75">Hotel Address</p>
            <div className="flex items-center gap-1">
              <p className="flex size-8 items-center justify-center rounded-[4px] border border-primary-400 px-4">
                {hotelReviewsScore}
              </p>
              <p className="smallest">
                {" "}
                <span className="font-bold ">{hotelReviewsDesc}</span> {hotelReviewsTotal} reviews
              </p>
            </div>
          </div>
        </div>
        <div className=" border-y py-2">
          <p>
            Your booking is protected by <span className="font-bold">golobe</span>
          </p>
        </div>

        <div>
          <p className="font-bold  pb-2">Price Details</p>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span className="font-bold">{formatCurrency(basePrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-bold">{formatCurrency(discount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="font-bold">{formatCurrency(taxes)}</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span className="font-bold">{formatCurrency(serviceFee)}</span>
            </div>
          </div>
          <div className="flex justify-between border-t py-2 font-bold mt-4">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PriceSummaryCard;
