import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { userQueryOptions } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useRouterState } from "@tanstack/react-router";

export const LoginSignupCard = ({ onConfirmBooking }: { onConfirmBooking: () => void }) => {
  const { data } = useQuery(userQueryOptions);
  function toQueryString(search: Record<string, any>) {
    const params = new URLSearchParams();
    for (const key in search) {
      const value = search[key];
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined) {
        params.set(key, value);
      }
    }
    return params.toString() ? `?${params.toString()}` : "";
  }
  const location = useLocation();
  const pathname = useRouterState({
    select: (state) => `${state.location.pathname}${toQueryString(state.location.search)}`,
  });

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
          <Button variant={"default"} asChild>
            <Link to={`/login`} onClick={() => sessionStorage.setItem("returnTo", pathname)}>
              Continue to Login/Signup
            </Link>
          </Button>
        </>
      )}
    </Card>
  );
};
