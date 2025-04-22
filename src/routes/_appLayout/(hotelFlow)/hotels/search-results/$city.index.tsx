import FiltersFull from "@/components/Filters/FiltersFull";
import Map from "@/components/Map/Map";
import HotelSearch from "@/components/Search/HotelSearch";
import SearchHotelResults from "@/components/Search/SearchHotelResults";
import { Button } from "@/components/ui/button";
import { client } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Filter } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const hotelSearchSchema = z.object({
  rating: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  price: z
    .string()
    .regex(/^\d+-\d+$/)
    .optional(),
  checkin: z
    .string()
    .regex(/^\d{4}\/\d{2}\/\d{2}$/) // Validate checkin date in YYYY/MM/DD format
    .optional(),
  checkout: z
    .string()
    .regex(/^\d{4}\/\d{2}\/\d{2}$/) // Validate checkout date in YYYY/MM/DD format
    .optional(),
  adults: z.string().optional(),
  children: z.string().optional(),
  rooms: z.string().optional(),
  location: z.string().optional(),
});

export const Route = createFileRoute("/_appLayout/(hotelFlow)/hotels/search-results/$city/")({
  component: HotelSearchResults,
  validateSearch: hotelSearchSchema,
  loader: async ({ params }) => {
    const city = params.city;
    return await client.getHotelsByLocation({
      pageNumber: 1,
      city,
    });
  },
});

function HotelSearchResults() {
  const [isFiltersFullOpen, setIsFiltersFullOpen] = useState(false);
  const [isFiltersMobileFullOpen, setIsFiltersMobileFullOpen] = useState(false);
  const initialData = Route.useLoaderData();
  const search = Route.useSearch();
  const { city } = Route.useParams();

  const rating = search.rating ?? undefined;
  const price = search.price ?? "";
  const parsedPrice = price?.split("-").map(Number) as [number, number];
  const priceRange = price.split("-").map(Number) as [number, number];
  const amenities = search.amenities ?? [];
  const adults = search.adults ?? "";
  const children = search.children ?? "";
  const rooms = search.rooms ?? "";

  const { data: entityData } = useQuery({
    queryKey: ["location-entity"],
    queryFn: async () => client.getHotelEntityByName({ city }),
  });

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["hotel-results", rating, price, amenities],
      queryFn: ({ pageParam = 2 }) =>
        client.getHotelsByLocation({
          pageNumber: pageParam,
          city,
          rating,
          price: parsedPrice,
          amenities,
        }),
      initialPageParam: 2,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
    });

  const hotels = data?.pages.flatMap((pages) => pages.data) ?? [];
  const totalCount = data?.pages[0].totalCount ?? 0;

  return (
    <div
      className="w-full mx-auto px-5 flex flex-col mt-24"
      style={{
        height: `calc(100vh - ${52}px)`,
      }}
    >
      <div className="hidden lg:flex justify-end items-center w-full py-5 gap-4 px-4">
        <Button
          variant="outline"
          className={cn(
            "gap-2 rounded-md border-primary-400 hover:bg-primary-500 hover:text-primary-100",
            isFiltersFullOpen && "bg-primary-700 text-primary-100"
          )}
          onClick={() => {
            setIsFiltersFullOpen(!isFiltersFullOpen);
          }}
        >
          <Filter className="w-4 h-4" />
          <span>All Filters</span>
        </Button>
        <HotelSearch icon />
      </div>
      <div className="flex justify-between items-center w-full py-5 lg:hidden">
        <Sheet open={isFiltersMobileFullOpen} onOpenChange={setIsFiltersMobileFullOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "gap-2 rounded-md border-primary-400 hover:bg-primary-500 hover:text-primary-100",
                isFiltersFullOpen && "bg-primary-700 text-primary-100"
              )}
            >
              <Filter className="w-4 h-4" />
              <span>All Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-4 w-11/12 max-w-sm overflow-y-auto">
            <FiltersFull />
          </SheetContent>
        </Sheet>
        <HotelSearch icon />
      </div>

      <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
        <aside
          className={`h-full overflow-auto transition-all duration-300 ease-in-out ${
            isFiltersFullOpen ? "w-4/12 opacity-100 visible" : "w-0 opacity-0 invisible"
          }`}
        >
          <FiltersFull />
        </aside>
        <Map
          properties={hotels}
          error={error}
          status={status}
          isFetching={isFetching}
          entity={entityData}
        />
        {/* <div className="hidden lg:flex basis-12/12 grow relative rounded-xl border h-full bg-primary-400"></div> */}
        <main className="lg:basis-8/12 h-screen ">
          <SearchHotelResults
            searchResults={hotels}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </main>
      </div>
    </div>
  );
}
