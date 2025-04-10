export type LocationEntity = {
  entityName: string;
  entityHierarchy: string;
  entityId: string;
  lat?: string;
  lng?: string;
};

import type { StringValidation } from "zod";

export interface heroSectionProps {
  imgUrl: string;
  topText: string;
  middleText?: string;
  bottomText: string;
  position: "left" | "center" | "right";
  type: "both" | "flights" | "stays";
}
export interface PopularDestinationCardProps {
  imgUrl?: string;
  city: string;
  location: string;
  id: string;
}

export interface LinkCardProps {
  title: string;
  details: string;
  link: string;
  imageUrl: string;
  size: "small" | "medium" | "large";
  buttonText: string;
  price?: string;
  icon: boolean;
}

export interface ReviewCardProps {
  reviewTitle: string;
  reviewAuthorName: string;
  reviewAuthorOrganisation?: string;
  reviewPlatform: {
    name: string;
    logo?: string;
  };
  reviewBody: string;
  starCount: number;
  link: string;
  imageUrl: string;
}

export interface NavbarLinkProps {
  imageUrl: string;
  imageUrlDark?: string;
  link: string;
  label: string;
}

export type FooterLink = {
  label: string;
  url: string;
};

export interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

// export interface SearchResultProps {
//   hotel_id:string;
//   hotelName: string;
//   hotel_stars: number;
//   hotel_longitude: number;
//   hotel_latitude:number;
//   hotel_distance?: string;
//   hotel_relevant_poi_distance?:string;
//   hotel_reviews_score:number;
//   hotel_reviews_total:number;
//   hotel_reviews_desc:string;
//   hotel_lowest_price:number;
//   hotel_partnet_name?:string;
//   hotel_image_urls:[{}];
//   hotel_hotel_description:string;
//   hotel_amenities:[{}];
//   hotel_checkin_time:string;
//   hotel_checkout_time:string;
//   hotel_nation:string;
//   hotel_city:string;
//   hotel_street_address:string;
//   hotel_district?:string;
//   hotel_postal_code?:string;
//   hotel_additional_image_urls:[{}];
// }

export interface AdditionalImage {
  category: string;
  thumbnail: string;
  gallery: string;
  dynamic: string;
}

export interface SearchResultsProps {
  hotelId: string;
  hotelName: string;
  hotelStars: number;
  hotelLongitude?: number;
  hotelLatitude?: number;
  hotelDistance?: string | null;
  hotelRelevantPoiDistance?: string | null;
  hotelReviewsScore: number;
  hotelReviewsTotal: number;
  hotelReviewsDesc: string;
  hotelLowestPrice: number;
  hotelPartnerName?: string;
  hotelImageUrls: string;
  hotelHotelDescription?: string;
  hotelAmenities?: string[];
  hotelCheckinTime?: string;
  hotelCheckoutTime?: string;
  hotelNation?: string;
  hotelCity?: string;
  hotelStreetAddress: string;
  hotelDistrict?: string | null;
  hotelPostcode?: string | null;
  hotelAdditionalImageUrls?: AdditionalImage[];
  totalAmenities: number;
  rateFrequency: string;
}

export interface SearchHotelDetailResultsProps {
  hotelId: string;
  hotelName: string;
  hotelStars: number;
  hotelLongitude?: number;
  hotelLatitude?: number;
  hotelDistance?: string | null;
  hotelRelevantPoiDistance?: string | null;
  hotelReviewsScore: number;
  hotelReviewsTotal: number;
  hotelReviewsDesc: string;
  hotelLowestPrice: number;
  hotelPartnerName?: string;
  hotelImageUrls: string;
  hotelHotelDescription?: string;
  hotelAmenities?: string[];
  hotelCheckinTime?: string;
  hotelCheckoutTime?: string;
  hotelNation?: string;
  hotelCity?: string;
  hotelStreetAddress: string;
  hotelDistrict?: string | null;
  hotelPostcode?: string | null;
  hotelAdditionalImageUrls: AdditionalImage[];
  totalAmenities: number;
  rateFrequency: string;
}

export type SocialLinks = {
  name: string;
  imageUrl: string;
};
