const PriceSummaryCard = () => {
  return (
    <div className="bg-white">
      <article className="card-shadow flex flex-col gap-2 overflow-hidden rounded-2xl lg:h-[450px] lg:min-h-[300px]  lg:gap-6 border p-6">
        <div className=" flex gap-6 border">
          <img
            src="https://placehold.co/400x400/png"
            width={900}
            height={900}
            alt={"hotel image"}
            className="size-full max-h-[120px] max-w-[120px] rounded-2xl"
          />

          <div className="flex w-full flex-col gap-4 border-accent-600">
            <h6 className="trade__bold">Hotel Name</h6>
            <p className="smallest montserrat__medium  text-black/75">Hotel Address</p>
            <div className="flex items-center gap-1">
              <p className="flex size-8 items-center justify-center rounded-[4px] border border-primary-400 px-4">
                {"5"}
              </p>
              <p className="smallest">
                {" "}
                <span className="montserrat__bold ">Good</span> 789 reviews
              </p>
            </div>
          </div>
        </div>
        <div className=" border-y-2 py-2">
          <p>Your booking is protected by GOLOBE</p>
        </div>

        <div>
          <p className="font-bold border-b pb-2">Price Details</p>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between">
              <span>Base Fare</span>
              <span className="font-bold">$240</span>
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-bold">$0</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="font-bold">$20</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span className="font-bold">$5</span>
            </div>
          </div>
          <div className="flex justify-between font-bold mt-4">
            <span>Total</span>
            <span>$265</span>
          </div>
        </div>
      </article>
    </div>
  );
};

export default PriceSummaryCard;
