import { Outlet } from "react-router-dom";
import RootHeader from "../components/rootHeader.tsx/RootHeader";
import Filters from "../components/Filters/Filters";
import { useEffect, useMemo } from "react";
import { useAnalyticsContext } from "../providers/AnalyticsProvider";
import { ANALYTICS_URL } from "../constants/ApiEndpoints";
import { useFetch } from "../hooks/useFetch";
import type { AnalyticsData } from "../types/Provider/analyticsProvider";

const RootLayout = () => {
  const {
    ageGroup,
    gender,
    startDate,
    endDate,
    setIsAnalyticsDataLoading,
    setAnalyticsData,
  } = useAnalyticsContext();

  const params = useMemo(() => {
    return { ageGroup, gender, startDate, endDate };
  }, [ageGroup, gender, startDate, endDate]);

  const [analyticsData, isAnalyticsDataLoading] = useFetch<AnalyticsData>(
    ANALYTICS_URL,
    params
  );

  // store analytics data
  useEffect(() => {
    setIsAnalyticsDataLoading(isAnalyticsDataLoading);
    setAnalyticsData(analyticsData);
  }, [
    analyticsData,
    isAnalyticsDataLoading,
    setAnalyticsData,
    setIsAnalyticsDataLoading,
  ]);

  return (
    <div className="layout">
      <RootHeader />
      <Outlet />
      <Filters />
    </div>
  );
};

export default RootLayout;
