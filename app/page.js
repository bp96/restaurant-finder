"use client";
import GlobalApi from "@/Shared/GlobalApi";
import BusinessList from "@/components/Home/BusinessList";
import CategoryList from "@/components/Home/CategoryList";
import GoogleMapView from "@/components/Home/GoogleMapView";
import RangeSelect from "@/components/Home/RangeSelect";
import SelectRating from "@/components/Home/SelectRating";
import SkeletonLoading from "@/components/SkeletonLoading";
import { UserLocationContext } from "@/context/UserLocationContext";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [category, setCategory] = useState();
  const [radius, setRadius] = useState(2500);
  const [businessList, setBusinessList] = useState([]);
  const [businessListOrg, setBusinessListOrg] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);

  // checks if user is signed in, otherwise redirects to login page. Authentication not currently set up so disabled for now.
  useEffect(() => {
    if (!session?.user) {
      // router.push('/Login')
    }
  }, [session]);

  useEffect(() => {
    getGooglePlace();
  }, [category, radius]);

  const getGooglePlace = () => {
    if (category) {
      setLoading(true);

      GlobalApi.getGooglePlace(
        category,
        radius,
        userLocation.lat,
        userLocation.lng
      ).then((resp) => {
        console.log(resp.data.product.results);
        setBusinessList(resp.data.product.results);
        setBusinessListOrg(resp.data.product.results);
        setLoading(false);
      });
    }
  };

  // filter business list using the rating selected
  const setRating = (rating) => {
    if (rating.length == 0) {
      setBusinessList(businessListOrg);
    }
    const result = businessList.filter((item) => {
      for (let i = 0; i < rating.length; i++) {
        if (item.rating >= rating[i]) {
          return true;
        }
        return false;
      }
    });

    //  console.log(result);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 ">
      <title>Restaurant Finder</title>
      <div className="p-3 ">
        <CategoryList onCategoryChange={(value) => setCategory(value)} /> {/* passing the setCategory function as the onCategoryChange param in the CategoryList component */}
        <RangeSelect onRadiusChange={(value) => setRadius(value)} />
        <SelectRating onRatingChange={(value) => setRating(value)} /> {/* passing the onRatingChange function as the onRatingChange param in the SelectRating component */}
      </div>
      <div className=" col-span-3 ">
        <GoogleMapView businessList={businessList} />
        <div
          className="md:absolute mx-2 w-[98%] md:w-[75%]
            relative md:bottom-5"
        >
          {!loading ? (
            <BusinessList businessList={businessList} />
          ) : (
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((item, index) => (
                <SkeletonLoading key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
