import { useState } from "react";
import { Input } from "@/components/ui/input";
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
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { bedDark, buildingDark, calendarDark, crossDark, personDark } from "@/assets/icons/index";

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
});

const HotelSearch = ({ icon }: { icon: boolean }) => {
  const { setValue } = useForm();
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [search, setSearch] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      guests: "1",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={() => {
          console.log("tried submit");
        }}
        className="flex w-full  flex-col items-center justify-center gap-8  text-black"
      >
        <div className="flex sm:flex-col lg:flex-row w-full max-w-[1184px] gap-4 py-2">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="relative flex w-full max-w-[416px] flex-col">
                <FormLabel className="absolute left-3 bg-white px-2">Enter Destination</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-1 rounded-md border px-2">
                    <img src={bedDark} width={20} height={20} alt="bed-icon" />
                    <Input
                      type="text"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      placeholder=""
                      className="no-focus border-none bg-transparent bg-none text-black shadow-none outline-none"
                    />
                  </div>
                </FormControl>
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
                        onSelect={(date) => {
                          field.onChange(date);
                          setValue("date", date);
                        }}
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
                        onSelect={(date) => {
                          field.onChange(date);
                          setValue("date", date);
                        }}
                        // disabled={[{ before: new Date() }]}
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
                <FormItem className="relative flex w-full max-w-[240px] flex-col">
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
                          <div className="space-y-2"></div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="adults">Adults</Label>
                              <div className=" col-span-2 col-start-2 flex items-center  justify-between rounded-md border px-8 py-px">
                                <Button
                                  size={"sm"}
                                  onClick={() => {
                                    adults > 1 && setAdults(adults - 1);
                                  }}
                                >
                                  -
                                </Button>
                                <span className=" text-center">{adults}</span>
                                <Button
                                  size={"sm"}
                                  onClick={() => {
                                    adults < 30 && setAdults(adults + 1);
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="children">Children</Label>
                              <div className=" col-span-2 col-start-2 flex  items-center  justify-between rounded-md border px-8 py-px">
                                <Button
                                  size={"sm"}
                                  onClick={() => {
                                    children > 0 && setChildren(children - 1);
                                  }}
                                >
                                  -
                                </Button>
                                <span className=" text-center">{children}</span>
                                <Button
                                  size={"sm"}
                                  onClick={() => {
                                    children < 10 && setChildren(children + 1);
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="rooms">Rooms</Label>
                              <div className=" col-span-2 col-start-2 flex items-center justify-between rounded-md border px-8 py-px">
                                <Button
                                  size={"sm"}
                                  onClick={() => {
                                    rooms > 1 && setRooms(rooms - 1);
                                  }}
                                >
                                  -
                                </Button>
                                <span className=" text-center">{rooms}</span>
                                <Button
                                  size={"sm"}
                                  onClick={() => {
                                    rooms < 30 && setRooms(rooms + 1);
                                  }}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
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
