import { createFileRoute, Outlet } from "@tanstack/react-router";
import Footer from "@/components/Footer/Footer";
import { useEffect } from "react";
import { useFilterStore } from "@/store/useFilterStore";

export const Route = createFileRoute("/_appLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    rating,
    price,
    amenities,

    adults,
    children,
    rooms,
    checkin,
    checkout,
  } = Route.useSearch();

  // console.log(
  //   "i am tired",
  //   "rating-",
  //   rating,

  //   "price-",
  //   price,
  //   "amenities-",
  //   amenities,
  //   "adults-",
  //   adults,
  //   "checkin-",
  //   checkin,
  //   "checkout-",
  //   checkout,
  //   "children-",
  //   children,
  //   "location-",
  //   location
  // );
  const setFilters = useFilterStore((state) => state.setFilters);

  useEffect(() => {
    setFilters({
      rating: rating ? parseInt(rating) : undefined,
      price: price ? (price.split("-").map(Number) as [number, number]) : undefined,
      amenities: amenities ? amenities : undefined,
      adults: adults ? parseInt(adults) : undefined,
      children: children ? parseInt(children) : undefined,
      rooms: rooms ? parseInt(rooms) : undefined,
      checkin: checkin ? new Date(checkin) : undefined,
      checkout: checkout ? new Date(checkout) : undefined,
    });
  }, [rating, price, amenities, location, adults, children, rooms, checkin, checkout, setFilters]);

  return (
    <main className="relative min-h-screen flex flex-col ">
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
