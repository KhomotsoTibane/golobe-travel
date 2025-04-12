import Navbar from "@/components/Navbar/Navbar";
import type { QueryClient } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useMatch, useMatches } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useFilterStore } from "@/store/useFilterStore";
import { useEffect } from "react";

// Define router context
interface MyRouterContext {
  queryClient: QueryClient;
}

// Define the shape of valid search filters
type searchFilters = {
  rating?: string;
  price?: string;
  amenities?: string[];
  adults?: string;
  children?: string;
  rooms?: string;
  checkin?: string;
  checkout?: string;
};

// Create root route with search validation
export const Route = createRootRouteWithContext<MyRouterContext>()({
  validateSearch: (search: Record<string, unknown>): searchFilters => ({
    rating: typeof search.rating === "string" ? search.rating : undefined,
    price: typeof search.price === "string" ? search.price : undefined,
    amenities: Array.isArray(search.amenities)
      ? search.amenities
      : typeof search.amenities === "string"
        ? search.amenities.split(",")
        : undefined,
    adults: typeof search.adults === "string" ? search.adults : undefined,
    children: typeof search.children === "string" ? search.children : undefined,
    rooms: typeof search.rooms === "string" ? search.rooms : undefined,
    checkin: typeof search.checkin === "string" ? search.checkin : undefined,
    checkout: typeof search.checkout === "string" ? search.checkout : undefined,
  }),
  component: Home,
});

function Home() {
  const { rating, rooms, price, amenities, adults, checkin, checkout, children } =
    Route.useSearch();

  const setFilters = useFilterStore((state) => state.setFilters);
  // const match = useMatch({ from: `/_appLayout/(hotelFlow)/hotels/search-results/$city/` });
  // console.log("matc city", match.params.city);
  const matches = useMatches();
  const isSearchResultsPage = useMatches().find((m) => m.routeId?.includes("search-results/$city"));

  const searchMatch = matches.find((m) => m.routeId?.includes("hotels/search-results"));

  const city = (searchMatch?.params as { city: string })?.city;

  useEffect(() => {
    if (!isSearchResultsPage) return;
    const parsedFilters = {
      rating: rating ? parseInt(rating) : undefined,
      price: price ? (price.split("-").map(Number) as [number, number]) : undefined,
      amenities: amenities ? amenities : undefined,
      location: city,
      adults: adults ? parseInt(adults) : undefined,
      children: children ? parseInt(children) : undefined,
      rooms: rooms ? parseInt(rooms) : undefined,
      checkin: checkin ? new Date(checkin) : undefined,
      checkout: checkout ? new Date(checkout) : undefined,
    };
    setFilters(parsedFilters);
  }, [rating, rooms, price, amenities, adults, checkin, checkout, children]);

  return (
    <div className="grid h-full grid-rows-[auto,_1fr] w-full overflow-x-hidden">
      <Navbar />
      <div className="h-full max-w-screen w-full">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}
