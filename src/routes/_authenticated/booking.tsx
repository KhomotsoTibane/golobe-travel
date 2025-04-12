import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { userQueryOptions } from "@/lib/api";
import PriceSummaryCard from "@/components/Cards/PriceSummaryCard";
import { buildingDark, locationDark } from "@/assets/icons";
import { z } from "zod";

export const Route = createFileRoute("/_authenticated/booking")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery(userQueryOptions);
  return (
    <div>
      <div className="">Hello "/booking"!</div>;<p>{data?.cognitoInfo.username}</p>
      <div className="grid grid-cols-3 gap-10">
        <article className=" col-span-2 card-shadow flex flex-col p-6 rounded-xl">
          <div className="flex justify-between">
            <h4>Superior room - 1 double bed or 2 twin beds</h4>
            <div>
              <h5 className="montserrat__bold relative w-full text-accent-400">
                240
                <span className="montserrat__bold small">/night</span>
              </h5>{" "}
              <p className="small montserrat__medium w-full text-black/75 lg:text-right">
                excl.tax
              </p>
            </div>
          </div>

          <div>
            <img src="" alt="" />

            <div className="montserrat__medium flex flex-col gap-3">
              <h6 className="trade__bold">sakjhfkjafhjksd</h6>
              <div className="flex gap-px">
                <img src={locationDark} width={16} height={16} alt="coffee icon" />
                <p className="smallest montserrat__medium  text-black/75">kldslkjfklsdjf</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <p>
              <CheckingCard date={"Monday, 4 dec"} action={"check-in"} />
            </p>
            <img
              src={buildingDark}
              width={48}
              height={48}
              alt={"building"}
              className=" rounded-lg"
            />
            <p>
              <CheckingCard date={"Thursday, 9 dec"} action={"check-out"} />
            </p>
          </div>
        </article>
        <div className="col-span-1">
          <PriceSummaryCard />
        </div>
      </div>
    </div>
  );
}

export const CheckingCard = ({ date, action }: { date: string; action: string }) => {
  return (
    <div>
      <p>{date}</p>
      <p>{action}</p>
    </div>
  );
};
