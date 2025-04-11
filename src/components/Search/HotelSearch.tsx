import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { bedDark, buildingDark, calendarDark, crossDark, personDark } from "@/assets/icons/index";
import { useFilterStore } from "@/store/useFilterStore";
import { Navigate } from "@tanstack/react-router";

const formSchema = z.object({
  location: z.string().min(2, {
    message: "Location must be atleast 2 chacaters",
  }),
  guests: z.string(),
  checkin: z.date({
    required_error: "Check-in date is required to make a reservation",
  }),
  checkout: z.date({
    required_error: "Check-out date is required to make a reservation",
  }),
  rooms: z.string(),
  adults: z.string(),
  children: z.string().optional(),
});

const HotelSearch = ({ icon }: { icon: boolean }) => {
  const {
    rating,
    rooms,
    price,
    amenities,
    adults,
    checkin,
    checkout,
    children,
    location,
    setFilters,
  } = useFilterStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      guests: "1",
      checkin: checkin,
      checkout: checkout,
      // rooms: rooms.toString(),
      // adults: adults.toString(),
      // children: children.toString(),
    },
  });

  console.log(
    "saying this form hotel search baba",
    "rating-",
    rating,
    "rooms-",
    rooms,
    "price-",
    price,
    "amenities-",
    amenities,
    "adults-",
    adults,
    "checkin-",
    checkin,
    "checkout-",
    checkout,
    "children-",
    children,
    "location-",
    location
  );

  function onSubmit(value: z.infer<typeof formSchema>) {
    const checkinDate = new Date(value.checkin);
    const checkoutDate = new Date(value.checkout);
    const formattedCheckin = `${checkinDate.getFullYear()}/${(checkinDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${checkinDate.getDate().toString().padStart(2, "0")}`;
    const formattedCheckout = `${checkoutDate.getFullYear()}/${(checkoutDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${checkoutDate.getDate().toString().padStart(2, "0")}`;

    setFilters({
      location: value.location,
      children: children ?? value.children,
      rooms: parseInt(value.rooms),
      adults: parseInt(value.adults),
      checkin: checkinDate,
      checkout: checkoutDate,
    });

    // Navigate({
    //   to: "/hotels/search-results/$city",
    //   params: { city: value.location },
    //   search: {
    //     ...routerState.location.search,
    //     checkin: formattedCheckin,
    //     checkout: formattedCheckout,
    //     adults: formAdults.toString(),
    //     children: formChildren.toString(),
    //     rooms: formRooms.toString(),
    //   },
    // });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full  flex-col items-center justify-center gap-8  text-black"
      >
        <div className="flex sm:flex-col lg:flex-row w-full max-w-[1184px] gap-4 py-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="relative flex w-full max-w-[300px] flex-col ">
                <FormLabel className="absolute left-3 bottom-8.5 bg-white px-2">
                  Destination
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={location}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pick destination" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-default bg-white">
                    <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                    <SelectItem value="Malé">Malé</SelectItem>
                    <SelectItem value="Cape Town">Cape Town</SelectItem>
                    <SelectItem value="Paris">Paris</SelectItem>
                    <SelectItem value="New York">New York</SelectItem>
                    <SelectItem value="Tokyo">Tokyo</SelectItem>
                    <SelectItem value="Baku">Baku</SelectItem>
                    <SelectItem value="Dubai">Dubai</SelectItem>
                    <SelectItem value="Istanbul">Istanbul</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="checkin"
              render={({ field }) => (
                <FormItem className="relative flex w-full max-w-[240px] flex-col">
                  <FormLabel className="absolute left-1 bg-white px-2">Check-in</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full flex flex-between md:w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span></span>}
                          <img src={calendarDark} width={18} height={18} alt="calendar-icon" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto bg-white" align="start" side="bottom">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={[{ before: new Date() }]}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="checkout"
              render={({ field }) => (
                <FormItem className="relative flex w-full max-w-[240px] flex-col">
                  <FormLabel className="absolute left-1 bg-white px-2">Check-out</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full flex flex-between md:w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span></span>}
                          <img src={calendarDark} width={18} height={18} alt="calendar-icon" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto bg-white" align="start" side="top">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={[{ before: new Date() || checkin }]}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem className="relative flex w-full max-w-[300px] flex-col">
                  <FormLabel className="absolute left-1 bg-white px-2">Rooms & Guests</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="">
                          <div className="flex w-full justify-evenly gap-2">
                            <img src={personDark} height={15} width={15} alt="person icon" />
                            <div className="flex grow gap-1">
                              <span>
                                {" "}
                                {rooms} {rooms === 1 ? "Room" : "Rooms"}{" "}
                              </span>
                              <span>
                                · {adults} {adults === 1 ? "Adult" : "Adults"}{" "}
                              </span>
                              {children > 0 && (
                                <span>
                                  · {children} {children === 1 ? "Child" : "Children"}
                                </span>
                              )}
                            </div>
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 bg-white">
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            {[
                              { label: "Adults", value: adults, key: "adults", min: 1, max: 30 },
                              {
                                label: "Children",
                                value: children,
                                key: "children",
                                min: 0,
                                max: 10,
                              },
                              { label: "Rooms", value: rooms, key: "rooms", min: 1, max: 30 },
                            ].map(({ label, value, key, min, max }) => (
                              <div key={label} className="grid grid-cols-3 items-center gap-4">
                                <Label>{label}</Label>
                                <div className="col-span-2 col-start-2 flex items-center justify-between rounded-md border px-8 py-px">
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      const num = parseInt(value.toString() ?? "0");
                                      if (num > min) {
                                        const updated = (num - 1).toString();
                                        setFilters({ [key]: updated });
                                        form.setValue(key as any, updated);
                                      }
                                    }}
                                  >
                                    -
                                  </Button>
                                  <span className="text-center">{value}</span>
                                  <Button
                                    size="sm"
                                    onClick={() => {
                                      const num = parseInt(value.toString() ?? "0");
                                      if (num < max) {
                                        const updated = (num + 1).toString();
                                        setFilters({ [key]: updated });
                                        form.setValue(key as any, updated);
                                      }
                                    }}
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={"default"}
              className="flex lg:hidden items-center justify-center gap-1 text-black"
              disabled={false}
            >
              <img src={buildingDark} width={16} height={16} alt="building" />
            </Button>
          </div>

          <Button
            type="submit"
            variant={"default"}
            className="hidden lg:flex items-center justify-center gap-1 text-black"
            disabled={false}
          >
            <img src={buildingDark} width={16} height={16} alt="building" />
            {icon ? null : "Show Places"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HotelSearch;
