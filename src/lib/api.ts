import type {
  detailsSearchParmas,
  LocationEntity,
  pageParams,
  PaginatedHotelResponse,
  searchByEntityParams,
  SearchHotelDetailResultsProps,
} from "@/types";

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
  async getHotelEntityByName(params: searchByEntityParams): Promise<LocationEntity[]> {
    const { city } = params;
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hotel-entity/${city}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    console.log(json);
    return json as LocationEntity[];
  },
  async getHotelsByLocation(params: pageParams): Promise<PaginatedHotelResponse> {
    const { pageNumber, city, rating, price, amenities, rooms, adults, children } = params;

    const query = new URLSearchParams();
    query.set("id", city);
    query.set("page", pageNumber.toString());
    query.set("recordsPerPage", "3");

    if (rating !== undefined) query.set("rating", rating);
    if (price?.length === 2) {
      query.set("priceMin", price[0].toString());
      query.set("priceMax", price[1].toString());
    }

    if (amenities?.length) {
      for (const amenity of amenities) {
        query.append("amenities", amenity); // multiple values
      }
    }
    if (rooms) query.set("rooms", rooms);
    if (adults) query.set("adults", adults);
    if (children) query.set("children", children);

    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/get-all-hotel-data-by-entity-location?${query.toString()}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    const totalPages = Math.ceil(json.totalCount / 3);
    console.log("api response", json);
    return {
      data: json.data,
      totalCount: json.totalCount,
      nextCursor: pageNumber < totalPages ? pageNumber + 1 : undefined,
    };
  },
  async getHotelDetails(params: detailsSearchParmas): Promise<SearchHotelDetailResultsProps> {
    const { hotelName } = params;
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get-hotel-details/${hotelName}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    console.log("api response 2", json);
    return json;
  },
};
