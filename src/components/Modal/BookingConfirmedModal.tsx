import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2Icon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { Link, useNavigate } from "@tanstack/react-router";
import { useFilterStore } from "@/store/useFilterStore";

const BookingConfirmation = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { resetFilters } = useFilterStore();
  const navigate = useNavigate();
  const handleHomeClick = () => {
    () => setIsOpen(false);
    // resetFilters();
    navigate({ to: `/` });
  };

  const handleBookingsClick = () => {
    () => setIsOpen(false);
    sessionStorage.setItem("returnToAuthRoute", "/profile");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-black p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <CheckCircle2Icon
              className="text-primary-500 fill-primary-500 rotate-12 text-[250px] absolute z-0 -top-24 -left-24"
              size={48}
            />
            <div className="relative z-10">
              <div className="text-primary-500 fill-primary-500  mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <CheckCircle2Icon size={48} />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">Booking Confirmed!</h3>
              <p className="text-center mb-6">Your stay has been successfully booked.</p>
              <div className="flex gap-2  justify-evenly">
                <Button
                  size={"lg"}
                  className={cn(
                    "bg-primary-400 transition-opacity text-indigo-600 font-semibold  py-2 rounded"
                  )}
                  asChild
                >
                  <Link to={`/profile`} onClick={handleBookingsClick}>
                    View Bookings
                  </Link>
                </Button>

                <Button
                  size={"lg"}
                  className={cn(
                    "bg-black hover:opacity-90 hover:bg-black transition-colors text-white font-semibold  py-2 rounded"
                  )}
                >
                  <Link to={`/`} onClick={handleHomeClick}>
                    Go Home
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingConfirmation;
