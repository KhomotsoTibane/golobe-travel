import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroLanding } from "@/assets/images";
import { client } from "@/lib/api";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import SearchTab from "@/components/Search/SearchTab";
import PopularDestinationCard from "@/components/Cards/PopularDestinationCard";
import BookingLinkCard from "@/components/Cards/BookingLinkCard";
import { CatagoryCTA } from "@/constants";
import Footer from "@/components/Footer/Footer";

export const Route = createFileRoute("/")({
  component: LandingPage,
  loader: async () => await client.getHotelEntities(),
});

function LandingPage() {
  const hotelEntities = Route.useLoaderData();

  return (
    <section className="w-full">
      <div
        className="relative mx-auto flex max-w-screen-2xl flex-col md:rounded-2xl bg-cover bg-no-repeat h-screen md:h-[80vh]"
        style={{
          backgroundImage: `url(${HeroLanding})`,
        }}
      >
        <div className="relative z-10 flex flex-col justify-center md:rounded-2xl">
          <div className="dark-gradient absolute inset-0 md:rounded-2xl " />
          <div className="flex flex-col items-center justify-center px-4 text-center h-screen md:h-[80vh]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex w-full flex-col items-center justify-center gap-4 h-full"
            >
              <h2 className="trade__normal text-white text-lg sm:text-xl md:text-2xl">
                Helping You
              </h2>
              <h1 className="trade__bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase">
                Live & Travel
              </h1>
              <h6 className="text-white text-sm sm:text-base">Special offers tailored to you</h6>
            </motion.div>
            <div className="absolute left-1/2 bottom-0 z-20 w-full max-w-screen-xl -translate-x-1/2 translate-y-10 px-4 hidden md:block md:px-20">
              <SearchTab type="both" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-40 w-full px-4 sm:px-8 md:px-20">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div className="flex flex-col gap-4">
              <h4 className="montserrat__semibold text-xl">Plan your perfect trip</h4>
              <p className="montserrat__normal text-base text-black">
                Search Flights & Places to Hire for Our Most Popular Destinations
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Link to="/">
                <Button variant="outline" className="border-primary-400">
                  See more places
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 border">
            {hotelEntities?.map((destination) => (
              <PopularDestinationCard
                key={destination.entityName}
                city={destination.entityName}
                location={destination.entityHierarchy}
                id={destination.entityId}
              />
            ))}
          </div>
          <div className="mt-20 grid w-full grid-cols-1 justify-items-center gap-6 px-20 lg:grid-cols-2">
            {CatagoryCTA.map((card) => (
              <BookingLinkCard
                key={card.title}
                title={card.title}
                details={card.details}
                link={card.link}
                size={card.size}
                buttonText={card.buttonText}
                icon={card.icon}
                imageUrl={card.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
