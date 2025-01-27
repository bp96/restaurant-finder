import { MarkerF, OverlayView } from "@react-google-maps/api";
import React, { useContext } from "react";
import BusinessItem from "./BusinessItem";
import { SelectedBusinessContext } from "@/context/SelectedBusinessContext";

// component for displaying all the business markers on the GoogleMapView
function Markers({ business }) {
  const { selectedBusiness, setSelectedBusiness } = useContext(
    SelectedBusinessContext
  );
  return (
    <div>
      <MarkerF
        position={business.geometry.location}
        onClick={() => setSelectedBusiness(business)}
        icon={{
          url: "/circle.png",
          scaledSize: {
            width: 10,
            height: 10,
          },
        }}
      >
        {selectedBusiness.reference == business.reference ? (
          <OverlayView
            position={business.geometry.location}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="ml-[-90px] mt-[-230px]">
              <BusinessItem business={business} showDir={true} />
              {/* <button id="" onClick={()=>setSelectedBusiness(null)}>X</button>  */}
            </div>
          </OverlayView>
        ) : null}
      </MarkerF>
    </div>
  );
}

export default Markers;
