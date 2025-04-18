import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const LoginSignupCard = ({ onConfirmBooking }: { onConfirmBooking: () => void }) => {
  const { data } = useQuery(userQueryOptions);

  return (
    <Card className="w-full  rounded-xl p-6 space-y-6 card-shadow bg-white border-0">
      {data ? (
        <>
          <div className="space-y-1">
            <h5 className="font-semibold">Book your adventure</h5>
          </div>
          <Button onClick={onConfirmBooking} variant={"default"}>
            Complete booking
          </Button>
        </>
      ) : (
        <>
          <div className="space-y-1">
            <h5 className="font-semibold">Login or Sign up to book</h5>
          </div>
          <Button variant={"default"}>Continue to Login/Signup</Button>
        </>
      )}
    </Card>
  );
};
