import type { SearchHotelDetailResultsProps } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type HotelStore = {
  selectedHotel?: SearchHotelDetailResultsProps;
};

type HotelActions = {
  setSelectedHotel: (hotel: SearchHotelDetailResultsProps) => void;
  removeSelectedHotel: () => void;
};

const initialHotelState: HotelStore = {
  selectedHotel: undefined,
};

export const useHotelStore = create<HotelStore & HotelActions>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialHotelState,
        setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
        removeSelectedHotel: () => set(initialHotelState),
      }),
      { name: "HotelStore" }
    )
  )
);
