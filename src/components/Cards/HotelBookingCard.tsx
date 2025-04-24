import { cn, fromIsoToOffsetParts } from "@/lib/utils";
import { Clock, DoorOpen, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";

const HotelBookingCard = ({
  checkInDate,
  checkOutDate,
  roomNumber = "On arrival",
  hotelLogo,
}: any) => {
  const parsedCheckin = fromIsoToOffsetParts(checkInDate);
  const parsedCheckout = fromIsoToOffsetParts(checkOutDate);
  return (
    <div className="card-shadow flex flex-col md:flex-row gap-8 items-center justify-between rounded-xl  p-4 bg-white w-full max-w-7xl mx-auto">
      {/* Left side */}
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="border border-primary-500 rounded-lg md:max-h-20 md:max-w-20 overflow-hidden">
          <img src={hotelLogo} alt="hotel logo" className="w-full h-[80px]  object-fit" />
        </div>
        <div className="flex flex-col md:flex-row max-w-64 gap-4 md:items-center">
          <div className=" flex flex-col w-40">
            <p className="text-muted-foreground">Check-In</p>
            <p className="font-semibold">{parsedCheckin.localDate}</p>
          </div>
          <span className="hidden md:flex mx-1 text-2xl">–</span>
          <div className=" flex flex-col w-40">
            <p className="text-muted-foreground">Check Out</p>
            <p className="font-semibold">{parsedCheckout.localDate}</p>
          </div>
        </div>
        <div className="hidden md:flex h-8 border-l border-primary-500 mx-4"></div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-xs">
              <Clock size={32} className="text-primary-500 fill-primary-300" />
              <div className="flex flex-col">
                <small className=" font-semibold text-muted-foreground w-20">Check-In time</small>
                <p className="font-medium">{parsedCheckin.localTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Clock size={32} className="text-primary-500 fill-primary-300" />
              <div className="flex flex-col">
                <small className=" font-semibold text-muted-foreground w-20">Check-Out</small>
                <p className="font-medium">{parsedCheckout.localTime}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            <DoorOpen size={32} className="text-primary-500 fill-primary-300" />
            <div className="flex flex-col">
              <small className=" font-semibold text-muted-foreground w-20">Room no.</small>
              <p className="font-medium">{roomNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2">
        <Button className={cn("text-black ")}>Download Ticket</Button>
        <Button className={cn("text-black  border border-primary-500 bg-white")} size={"icon"}>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default HotelBookingCard;
