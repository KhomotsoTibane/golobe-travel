import type { LocationEntity } from "@/types";

export const client = {
  async getHotelEntities() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hotel-entity`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    console.log(json);
    return json as LocationEntity[];
  },
};
