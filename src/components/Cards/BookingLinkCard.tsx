import type { LinkCardProps } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  bedDark,
  buildingDark,
  calendarDark,
  crossDark,
  paperPlaneDark,
  personDark,
} from "@/assets/icons/index";

const BookingLinkCard = ({
  title,
  details,
  link,
  imageUrl,
  size,
  buttonText,
  icon,
  price,
}: LinkCardProps) => {
  const sizeClasses = {
    small: "h-[280px] w-[300px]",
    medium: "h-[373px] w-[263px]",
    large: "h-[420px] w-[296px] md:h-[536px] md:w-[537px]",
  };

  return (
    <div
      className={`overflow-hidden rounded-xl border ${sizeClasses[size]} size-full bg-cover bg-center`}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {icon && (
        <div className="flex size-full flex-col justify-end bg-black/50 p-4">
          <div className="flex w-full flex-col items-center gap-2">
            <h3 className="font-trade__normal font-bold text-white">{title}</h3>
            <p className="max-w-96 text-wrap text-center align-middle text-white">{details}</p>
            <Link to={link} className={`py-2 ${icon === true ? "" : "w-full"}`}>
              <Button variant={"outline"} className="w-full text-black">
                {icon ? (
                  <span className="flex gap-1">
                    <img
                      src={paperPlaneDark}
                      alt="search icon"
                      width={14}
                      height={14}
                      className="cursor-pointer"
                    />
                    {buttonText}
                  </span>
                ) : (
                  buttonText
                )}
              </Button>
            </Link>
          </div>
        </div>
      )}

      {!icon && (
        <div className="flex size-full flex-col justify-end bg-black/50 p-4">
          <div className="flex w-full flex-col items-center gap-2">
            <div className="flex w-full">
              <div className="flex w-full flex-col">
                <h5 className="font-semibold text-white">{title}</h5>
                <p className="small text-white">{details}</p>
              </div>
              <div className="flex grow items-end  justify-end">
                <h5 className="font-semibold text-white">{price}</h5>
              </div>
            </div>
            <Link to={link} className={`w-full py-2`}>
              <Button variant="default" className="w-full text-black">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingLinkCard;
