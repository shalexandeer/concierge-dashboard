import { Card } from "@/components/ui/card";
import {
  usePartnersMarkerQuery,
  usePartnersQuery,
} from "@/services/partner/queries";
import { Partner } from "@/services/partner/types";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const westJavaCoordinates = {
  lat: -6.914744,
  lng: 107.6,
};

export function PartnersMap() {
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page") || "1");
  const pageSize = Number(searchParams.get("page_size") || "10");

  const filters = {
    name: searchParams.get("name") || undefined,
    type: (searchParams.get("type") as Partner["type"]) || undefined,
    is_active: searchParams.get("is_active") === "true" ? true : undefined,
    province_name: searchParams.get("province_name") || undefined,
    regency_name: searchParams.get("regency_name") || undefined,
    district_name: searchParams.get("district_name") || undefined,
    village_name: searchParams.get("village_name") || undefined,
    page: currentPage,
    page_size: pageSize,
  };
  const partners = usePartnersQuery(filters);
  const markers = usePartnersMarkerQuery(partners?.data?.data || []);
  const isLoading =
    partners.isLoading || markers.some((marker) => marker.isLoading);

  return (
    <Card className="p-6 animate-in animate-delay-400">
      <h1 className="font-display font-medium text-lg mb-2">
        Peta Pesebaran TPS
      </h1>

      <section className="w-full h-[500px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : (
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={westJavaCoordinates}
            defaultZoom={9}
            gestureHandling="greedy"
            disableDefaultUI={true}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.data?.place_id}
                position={marker.data?.geometry.location}
                title={marker.data?.formatted_address}
              />
            ))}
          </Map>
        )}
      </section>
    </Card>
  );
}
