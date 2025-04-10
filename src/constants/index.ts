import type {
  LinkCardProps,
  SearchResultsProps,
  PopularDestinationCardProps,
  ReviewCardProps,
  FooterSectionProps,
  NavbarLinkProps,
  SocialLinks,
} from "@/types/index";

import { Home, Warehouse, Building, Castle, Trees } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import planeSvg from "@/assets/icons/airplane.svg";
import staySvg from "@/assets/icons/bed.svg";
import planeSvgDark from "@/assets/icons/airplanedark.svg";
import staySvgDark from "@/assets/icons/beddark.svg";
import {
  Baku,
  Dubai,
  Istanbul,
  London,
  Male,
  NewYork,
  Paris,
  Sydney,
  Tokyo,
  HotelCardHome,
  FlightCardHome,
  Review1,
  Review3,
  Review2,
  Melbourne,
  LondonEye,
  Columbia,
} from "@/assets/images";
import { googleIcon, instagramDark, youtubeDark, twitterDark, facebookDark } from "@/assets/icons";

export const socialLinksDark: SocialLinks[] = [
  {
    name: "facebook",
    imageUrl: facebookDark,
  },
  {
    name: "twitter",
    imageUrl: twitterDark,
  },
  {
    name: "youtube",
    imageUrl: youtubeDark,
  },
  {
    name: "instagram",
    imageUrl: instagramDark,
  },
];
// export enum AmenityEnum {
//   WasherDryer = "WasherDryer",
//   AirConditioning = "AirConditioning",
//   Dishwasher = "Dishwasher",
//   HighSpeedInternet = "HighSpeedInternet",
//   HardwoodFloors = "HardwoodFloors",
//   WalkInClosets = "WalkInClosets",
//   Microwave = "Microwave",
//   Refrigerator = "Refrigerator",
//   Pool = "Pool",
//   Gym = "Gym",
//   Parking = "Parking",
//   PetsAllowed = "PetsAllowed",
//   WiFi = "WiFi",
// }

// export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
//   WasherDryer: Waves,
//   AirConditioning: Thermometer,
//   Dishwasher: Waves,
//   HighSpeedInternet: Wifi,
//   HardwoodFloors: Home,
//   WalkInClosets: Maximize,
//   Microwave: Tv,
//   Refrigerator: Thermometer,
//   Pool: Waves,
//   Gym: Dumbbell,
//   Parking: Car,
//   PetsAllowed: PawPrint,
//   WiFi: Wifi,
// };

// export enum AmenityEnum {
//   HighSpeedInternetAccess = "HighSpeedInternetAccess",
//   WasherDryer = "WasherDryer",
//   AirConditioning = "AirConditioning",
//   Heating = "Heating",
//   SmokeFree = "SmokeFree",
//   SatelliteTV = "SatelliteTV",
//   DoubleVanities = "DoubleVanities",
//   TubShower = "TubShower",
//   CloseToTransit = "CloseToTransit",
//   GreatView = "GreatView",
//   Pool = "Pool",
//   Gym = "Gym",
//   Parking = "Parking",
//   PetsAllowed = "PetsAllowed",
//   Wifi = "WiFi",
// }

// export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
//   HighSpeedInternetAccess: Wifi,
//   WasherDryer: Waves,
//   AirConditioning: Thermometer,
//   Heating: Thermometer,
//   SmokeFree: Cigarette,
//   SatelliteTV: Tv,
//   DoubleVanities: Maximize,
//   TubShower: Bath,
//   CloseToTransit: Bus,
//   GreatView: Mountain,
//   Pool: Waves,
//   Gym: Dumbbell,
//   Parking: Car,
//   PetsAllowed: PawPrint,
//   WiFi: Wifi,
// };

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Home,
  Cottage: Trees,
};

// export const PopularDestinations: PopularDestinationCardProps[] = [
//   {
//     imgUrl: Istanbul,
//     city: "Istanbul",
//     country: "Turkey",
//   },
//   {
//     imgUrl: Sydney,
//     city: "Sydney",
//     country: "Australia",
//   },
//   {
//     imgUrl: Baku,
//     city: "Baku",
//     country: "Azerbajan",
//   },
//   {
//     imgUrl: Male,
//     city: "Malé",
//     country: "Maldives",
//   },
//   {
//     imgUrl: Paris,
//     city: "Paris",
//     country: "France",
//   },
//   {
//     imgUrl: NewYork,
//     city: "New York",
//     country: "USA",
//   },
//   {
//     imgUrl: London,
//     city: "London",
//     country: "UK",
//   },
//   {
//     imgUrl: Tokyo,
//     city: "Tokyo",
//     country: "Japan",
//   },
//   {
//     imgUrl: Dubai,
//     city: "Dubai",
//     country: "UAE",
//   },
// ];

export const CatagoryCTA: LinkCardProps[] = [
  {
    title: "Flights",
    details: "Search Flights & Bookings at out Most Popular Destinations",
    link: "/flights",
    imageUrl: FlightCardHome,
    icon: true,
    size: "large",
    buttonText: "Show Flights",
  },
  {
    title: "Hotels",
    details: "Search Flights & Bookings at out Most Popular Destinations",
    link: "/hotels",
    imageUrl: HotelCardHome,
    icon: true,
    size: "large",
    buttonText: "Show Hotels",
  },
];

export const UserReviews: ReviewCardProps[] = [
  {
    reviewTitle: "A real sense of community, nurtured",
    reviewAuthorName: "Olga",
    reviewAuthorOrganisation: "Wavve Studios – Kai Tak",
    reviewPlatform: {
      name: "Google",
      logo: googleIcon,
    },
    reviewBody:
      "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
    starCount: 5,
    link: "#",
    imageUrl: Review1,
  },
  {
    reviewTitle: "The facilities are superb. Clean, slick, bright.",
    reviewAuthorName: "Thomas",
    reviewAuthorOrganisation: "Wavve Studios – Olympic",
    reviewPlatform: {
      name: "Google",
      logo: googleIcon,
    },
    reviewBody:
      "“A real sense of community, nurtured”Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.View moreOlgaWeave Studios – Kai TakGoogle",
    starCount: 5,
    link: "#",
    imageUrl: Review2,
  },
  {
    reviewTitle: "A real sense of community, nurtured",
    reviewAuthorName: "Eliot",
    reviewAuthorOrganisation: "Wavve Studios – Kai Tak",
    reviewPlatform: {
      name: "Google",
      logo: googleIcon,
    },
    reviewBody:
      "Really appreciate the help and support from the staff during these tough times. Shoutout to Katie for helping me always, even when I was out of the country. And always available when needed.",
    starCount: 5,
    link: "#",
    imageUrl: Review3,
  },
];

export const footerLinks: FooterSectionProps[] = [
  {
    title: "Our Destinations",
    links: [
      { label: "Mpumalanga", url: `/hotels/search-results/${encodeURIComponent("Mpumalanga")}` },
      { label: "Cape Town", url: `/hotels/search-results/${encodeURIComponent("Cape Town")}` },
      { label: "Dubai", url: `/hotels/search-results/${encodeURIComponent("Dubai")}` },
      { label: "Paris", url: `/hotels/search-results/${encodeURIComponent("Paris")}` },
    ],
  },
  {
    title: "Our Activities",
    links: [
      { label: "Northern Lights", url: "/" },
      { label: "Cruising & sailing", url: "/" },
      { label: "Multi-activities", url: "/" },
      { label: "Kayaking", url: "/" },
    ],
  },
  {
    title: "Travel Blogs",
    links: [
      { label: "Bali Travel Guide", url: "/" },
      { label: "Sri Lanka Travel Guide", url: "/" },
      { label: "Peru Travel Guide", url: "/" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Our Story", url: "/" },
      { label: "Work with us", url: "/" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { label: "Our Story", url: "/" },
      { label: "Work with us", url: "/" },
    ],
  },
];

export const HotelsCTA: LinkCardProps[] = [
  {
    title: "Melbourn",
    details: "An amazing journey",
    link: "/hotels/search-results/Melbourn",
    imageUrl: Melbourne,
    icon: false,
    size: "medium",
    buttonText: "Book a Hotel",
    price: "600",
  },
  {
    title: "Paris",
    details: "A Paris adventure",
    link: "/hotels/search-results/Paris",
    imageUrl: HotelCardHome,
    icon: false,
    size: "medium",
    buttonText: "Book a Hotel",
    price: "400",
  },
  {
    title: "London",
    details: "London eye adventure",
    link: "/hotels/search-results/London",
    imageUrl: LondonEye,
    icon: false,
    size: "medium",
    buttonText: "Book a Hotel",
    price: "300",
  },
  {
    title: "Baku",
    details: "Amazing streets",
    link: "/hotels/search-results/Baku",
    imageUrl: Columbia,
    icon: false,
    size: "medium",
    buttonText: "Book a Hotel",
    price: "650",
  },
];

export const NavbarLinks: NavbarLinkProps[] = [
  {
    imageUrl: planeSvg,
    imageUrlDark: planeSvgDark,
    link: "/flights",
    label: "Find Flights",
  },
  {
    imageUrl: staySvg,
    imageUrlDark: staySvgDark,
    link: "/hotels",
    label: "Find Stays",
  },
];
