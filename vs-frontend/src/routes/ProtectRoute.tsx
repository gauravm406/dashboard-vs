import type React from "react";
import { useAuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { APP_ENDPOINTS } from "../constants/AppEndpoints";
import { useEffect } from "react";
import { useAnalyticsContext } from "../providers/AnalyticsProvider";

const ProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuthContext();
  const { setAgeGroup, setGender, setStartDate, setEndDate } =
    useAnalyticsContext();

  // if user is coming from shareable link
  const location = useLocation();
  useEffect(() => {
    if (!location?.search) return;
    const params = new URLSearchParams(location.search);
    setAgeGroup(params.get("ageGroup") as string);
    setGender(params.get("gender") as string);
    setStartDate(params.get("startDate") as string);
    setEndDate(params.get("endDate") as string);
  }, [location, setEndDate, setAgeGroup, setGender, setStartDate]);

  if (!isLoggedIn) return <Navigate to={`/${APP_ENDPOINTS.AUTH}`} replace />;

  return children;
};

export default ProtectRoute;
