import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type FilterState = {
  rating?: number; // parsed from string
  price?: [number, number]; // parsed from "100-200"
  amenities?: string[]; // parsed from comma-separated string or array
  location?: string;
  guests?: number;
  checkin?: Date; // parsed from string to Date
  checkout?: Date;
  rooms?: number;
  adults?: number;
  children?: number;
};

type FilterActions = {
  setFilters: (values: Partial<FilterState>) => void;
  resetFilters: () => void;
};

const initialState: FilterState = {
  rating: undefined,
  price: undefined,
  amenities: undefined,
  location: undefined,
  guests: undefined,
  checkin: undefined,
  checkout: undefined,
  rooms: 1,
  adults: 2,
  children: 0,
};

export const useFilterStore = create<FilterState & FilterActions>()(
  devtools(
    (set) => ({
      ...initialState,
      setFilters: (values) =>
        set((prev) => {
          const updated = { ...prev, ...values };
          console.log("Filter updated:", updated);
          return updated;
        }),
      resetFilters: () => set(initialState),
    }),
    { name: "FilterStore" }
  )
);
