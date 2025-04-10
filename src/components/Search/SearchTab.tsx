import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HotelSearch from "@/components/Search/HotelSearch";
import planeDarkSvg from "@/assets/icons/airplanedark.svg";
import bedDarkSvg from "@/assets/icons/beddark.svg";

const SearchTab = ({ type }: { type: string }) => {
  return (
    <div className="z-50 size-full max-h-[250px] rounded-3xl bg-white card-shadow px-8 py-4">
      {type === "both" && (
        <Tabs defaultValue="hotels" className="w-full">
          <TabsList className="h-12 gap-8">
            <TabsTrigger
              disabled
              value="flights"
              className="flex items-center justify-center gap-1"
            >
              <img src={planeDarkSvg} width={24} height={24} alt="plane-icon" />
              Flights
            </TabsTrigger>
            <TabsTrigger value="hotels" className="flex items-center justify-center gap-1">
              <img src={bedDarkSvg} width={24} height={24} alt="bed-icon" />
              Hotels
            </TabsTrigger>
          </TabsList>
          <TabsContent value="flights" className="h-[110px]">
            Flight search will go here
          </TabsContent>
          <TabsContent value="hotels" className="lg:h-[110px]">
            <HotelSearch icon={false} />
          </TabsContent>
        </Tabs>
      )}
      {type === "stays" && (
        <div className="flex flex-col gap-3">
          <h5 className="montserrat__h5-semibold">Find your next stay</h5>
          <HotelSearch icon />
        </div>
      )}
    </div>
  );
};

export default SearchTab;
