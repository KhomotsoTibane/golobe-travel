import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as string;

[-118.25, 34.05];

const MapDetails = ({ properties, error }: any) => {
  const mapContainerRef = useRef(null);
  //   const filters = useAppSelector((state) => state.global.filters);
  //   const { data: properties, isLoading, isError } = useGetPropertiesQuery(filters);

  console.log("datA", properties);

  useEffect(() => {
    if (!properties) {
      console.log("stuck in here");
      return;
    }

    console.log("made it out", properties);

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/jledoza/cm8oqi7h4005701s70htn6sl9",
      center: properties
        ? [properties.hotelLongitude, properties.hotelLatitude]
        : [30.207138411, -25.8638909153],
      zoom: 15,
    });

    console.log(",ap", map);

    // properties.forEach((property: any) => {
    const marker = createPropertyMarker(properties, map);
    console.log("marker", marker);
    const markerElement = marker.getElement();
    console.log("markerelement", markerElement);
    const path = markerElement.querySelector("path[fill='#3FB1CE']");
    console.log("path", path);
    if (path) path.setAttribute("fill", "#000000");
    // });

    const resizeMap = () => {
      if (map) setTimeout(() => map.resize(), 700);
    };
    resizeMap();

    return () => map.remove();
  }, [error, properties]);

  //   if (isFetching) return <>Loading...</>;
  if (error || !properties) return <div>Failed to load map</div>;

  return (
    // <div className="basis-5/12 grow relative rounded-xl border h-full">
    <div className=" relative rounded-xl w-full h-[400px]">
      <div
        className="map-container rounded-xl"
        ref={mapContainerRef}
        style={{
          height: "100%",
          width: "100%",
        }}
      />
    </div>
  );
};

const createPropertyMarker = (property: any, map: mapboxgl.Map) => {
  console.log("creatign marker", property);
  const marker = new mapboxgl.Marker()
    .setLngLat([property.hotelLongitude, property.hotelLatitude])
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `
        <div class="marker-popup">
          <div class="marker-popup-image"></div>
          <div>
            <a  
            href="/hotels/search-results/${encodeURIComponent(property.hotelCity)}/${encodeURIComponent(property.hotelName)}"
            class="marker-popup-title">${property.hotelName}</a>
            <p class="marker-popup-price">
              ${property.hotelLowestPrice}
              <span class="marker-popup-price-unit"> / night</span>
            </p>
          </div>
        </div>
        `
      )
    )
    .addTo(map);
  console.log("coords", property.hotelLongitude, property.hotelLatitude);
  return marker;
};

export default MapDetails;
//  <Link
//             to={`/hotels/search-results/$city/$hotelName`}
//             params={{ city: city, hotelName: hotelName }}
//           ></Link>
