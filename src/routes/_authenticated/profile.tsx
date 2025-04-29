import { createFileRoute, useRouteContext } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil, UploadCloud } from "lucide-react";

import { AccountBg } from "@/assets/images";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/api";
import type { HotelBookingCardData } from "@/types";
import HotelBookingCard from "@/components/Cards/HotelBookingCard";

export const Route = createFileRoute("/_authenticated/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { queryClient, user } = useRouteContext({ from: "/_authenticated" });

  const name = user?.userDetails.fullName;
  const email = user?.userDetails.email;
  const userId = user?.cognitoInfo.userId;

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-bookings", user],
    queryFn: async () => client.getUserBookings({ id: userId! }),
    enabled: !!user?.cognitoInfo.userId,
  });

  if (error) console.error("Error loading bookings", error);
  if (isLoading) console.log("Loading bookings...");

  if (isLoading) {
    return <div>Loading your bookings...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      {/* Cover Image */}
      <div
        className="relative h-48 w-full rounded-xl  border border-accent-300"
        style={{
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${AccountBg})`,
          objectFit: "contain",
          backgroundSize: "cover",
        }}
      >
        {/* <Button
          variant={"default"}
          className="absolute bottom-2 right-2 flex items-center gap-2 text-black"
        >
          <UploadCloud className="w-4 h-4" /> Upload new cover
        </Button> */}

        {/* Profile Picture */}
        <div className="absolute  -bottom-10 left-1/2 -translate-x-1/2 ">
          <div className="relative w-20 h-20 rounded-full border-4 border-white overflow-hidden">
            <img
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="profile"
              className="w-full h-full object-cover"
            />
            <Button
              size="icon"
              variant="secondary"
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full p-0"
            >
              <Pencil className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="mt-16 text-center">
        <h5 className="">{name}</h5>
        <p className="">{email}</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="account" className="mt-10 w-full">
        <TabsList className="flex justify-center w-full h-20 card-shadow">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="payments">Payment methods</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="p-6 space-y-6 mt-6 bg-white border-none card-shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p>{name}</p>
              </div>
              <Button disabled variant="outline">
                Change
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>{email}</p>
              </div>
              <div className="flex gap-2">
                <Button disabled variant="outline">
                  Change
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Phone number</p>
                <p></p>
              </div>
              <Button disabled variant="outline">
                Change
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p></p>
              </div>
              <Button disabled variant="outline">
                Change
              </Button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Date of birth</p>
                <p></p>
              </div>
              <Button disabled variant="outline">
                Change
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card className="p-6 mt-6 text-sm text-muted-foreground bg-white border-none">
            <div className="">
              <div
                id="searchResultContainer"
                className=" flex h-full flex-col gap-8 items-center justify-center mx-auto"
              >
                {data.map((result: HotelBookingCardData) => (
                  <HotelBookingCard
                    checkInDate={result.checkinDate}
                    checkOutDate={result.checkoutDate}
                    roomNumber="On arrival"
                    hotelLogo={result.hotelImageUrls[0]}
                  />
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="p-6 mt-6 text-sm text-muted-foreground bg-white border-none">
            Payment methods and billing info go here.
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
