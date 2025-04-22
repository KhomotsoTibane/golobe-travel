import type {
  bookingPriceParams,
  bookingPriceProps,
  confirmBookingPriceParams,
  detailsSearchParmas,
  LocationEntity,
  pageParams,
  PaginatedHotelResponse,
  searchByEntityParams,
  SearchHotelDetailResultsProps,
  userFavoriteParams,
} from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { fetchAuthSession, getCurrentUser, fetchUserAttributes } from "aws-amplify/auth";

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: fetchCurrentUser,
});

async function fetchCurrentUser() {
  try {
    const user = await getCurrentUser();
    const session = await fetchAuthSession();

    console.log("sesh", session);

    const email = session.tokens?.idToken?.payload.email;
    const { accessToken } = session.tokens ?? {};

    let res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user/${user.userId}`);
    let userDetails = res.ok ? await res.json() : null;
    const idToken = accessToken;

    if (!userDetails && res.status === 404) {
      const attributes = await fetchUserAttributes();
      const createRes = await fetch(`${import.meta.env.VITE_API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cognitoId: user.userId,
          username: user.username,
          firstname: attributes.given_name,
          lastname: attributes.family_name,
          email,
        }),
      });
      userDetails = await createRes.json();
    }

    return {
      cognitoInfo: user,
      userDetails,
      idToken,
    };
  } catch (error) {
    console.error("Error in fetchCurrentUser", error);
    return null;
  }
}

export const client = {
  async getHotelEntities() {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hotel-entity`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();

    return json as LocationEntity[];
  },
  async getHotelEntityByName(params: searchByEntityParams): Promise<LocationEntity[]> {
    const { city } = params;
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hotel-entity/${city}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();

    return json as LocationEntity[];
  },
  async getHotelsByLocation(params: pageParams): Promise<PaginatedHotelResponse> {
    const { pageNumber, city, rating, price, amenities, rooms, adults, children } = params;
    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};

    const query = new URLSearchParams();
    query.set("entityname", city);
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
      `${import.meta.env.VITE_API_BASE_URL}/by-entity-location?${query.toString()}`,
      {
        headers: { Authorization: `Bearer ${idToken}`, "Content-Type": "application/json" },
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    const totalPages = Math.ceil(json.totalCount / 3);

    return {
      data: json.data,
      totalCount: json.totalCount,
      nextCursor: pageNumber < totalPages ? pageNumber + 1 : undefined,
    };
  },
  async getHotelDetails(params: detailsSearchParmas): Promise<SearchHotelDetailResultsProps> {
    const { hotelName } = params;
    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${hotelName}/details`, {
      headers: { Authorization: `Bearer ${idToken}`, "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  },
  async getUserFavorites(params: userFavoriteParams) {
    const { id } = params;
    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/favorites/user/${id}`, {
      headers: { Authorization: `Bearer ${idToken}`, "Content-Type": "application/json" },
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const json = await res.json();
    return json;
  },
  async getBookingTotalPrice(params: bookingPriceParams): Promise<bookingPriceProps> {
    const { checkin, checkout, adults, children, rooms, basePrice, checkoutTime, checkinTime } =
      params;

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hotel-booking/calculate-total`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkinDate: checkin,
        checkoutDate: checkout,
        adults,
        children,
        rooms,
        baseNightlyRate: basePrice,
        checkinTime,
        checkoutTime,
      }),
    });

    const json = await res.json();
    return json;
  },
  async confirmBooking(params: confirmBookingPriceParams) {
    const {
      checkin,
      checkout,
      adults,
      children,
      rooms,
      basePrice,
      serviceFee,
      taxes,
      hotelId,
      userId,
      checkinTime,
      checkoutTime,
    } = params;

    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/hotel-booking/create-new`, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        hotelId: hotelId,
        checkinDate: checkin,
        checkoutDate: checkout,
        adults,
        children,
        rooms,
        basePrice,
        serviceFee,
        taxes,
        checkinTime,
        checkoutTime,
      }),
    });

    const json = await res.json();
    return json;
  },
  async toggleUserFavoriteHotel(params: userFavoriteParams) {
    const { id, hotelId } = params;
    const session = await fetchAuthSession();
    const { idToken } = session.tokens ?? {};
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/favorites/user/${id}/toggle`, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelId: hotelId,
      }),
    });
  },
};
