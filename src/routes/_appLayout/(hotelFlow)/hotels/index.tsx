import { createFileRoute } from "@tanstack/react-router";
import { HotelsCTA } from "@/constants";
import { StaysHero } from "@/assets/images";
import BookingLinkCard from "@/components/Cards/BookingLinkCard";
import { motion } from "framer-motion";
import SearchTab from "@/components/Search/SearchTab";
import NotFound from "@/components/NotFound";

export const Route = createFileRoute("/_appLayout/(hotelFlow)/hotels/")({
  component: HotelLandingPage,
  notFoundComponent: () => {
    return <p>This setting page doesn't exist!</p>;
  },
});

function HotelLandingPage() {
  return (
    <div className="size-full">
      <div
        className="relative mx-auto flex max-w-screen-2xl flex-col md:rounded-b-2xl bg-cover bg-no-repeat h-screen md:h-[80vh]"
        style={{
          backgroundImage: `url(${StaysHero})`,
        }}
      >
        <div className="relative z-10 flex flex-col justify-center md:rounded-b-2xl">
          <div className="dark-gradient absolute inset-0 md:rounded-b-2xl " />
          <div className="flex flex-col items-center justify-center px-4 text-center h-screen md:h-[80vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="absolute justify-center flex flex-col inset-0 gap-2 max-w-[440px] px-16 text-left"
            >
              <h2 className="font-trade__normal text-white leading-16">
                Make your travel wishlist, we'll do the rest
              </h2>

              <h6 className="text-white text-sm sm:text-base">Special offers tailored to you</h6>
            </motion.div>
            <div className="absolute left-1/2 bottom-0 z-20 w-full max-w-screen-xl -translate-x-1/2 translate-y-10 px-4 hidden md:block md:px-20">
              <SearchTab type="both" />
            </div>
          </div>
        </div>
      </div>

      {/* <HotelCTA /> */}
      <div className="mt-20 flex w-full flex-col max-w-screen-2xl mx-auto">
        <div className="flex gap-6">
          <div className="flex w-full px-4 md:px-20 lg:px-0 flex-col gap-4 text-wrap">
            <h4 className="montserrat__bold">Plan your perfect trip</h4>
            <p className="montserrat__normal text-black md:text-left text-wrap">
              Going somewhere to celebrate this season? Whether you’re going home or somewhere to
              roam, we’ve got the travel tools to get you to your destination.
            </p>
          </div>
        </div>
        <div className="mt-8 grid w-full grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
          {HotelsCTA.map((card) => (
            <BookingLinkCard
              key={card.title}
              title={card.title}
              details={card.details}
              link={card.link}
              size={card.size}
              buttonText={card.buttonText}
              icon={card.icon}
              imageUrl={card.imageUrl}
              price={card.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
