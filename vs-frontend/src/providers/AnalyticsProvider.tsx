import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { DEFAULT_ANALYTICS_CONTEXT_VALUES } from "../constants/providers/DefaultAnalyticsContextValues";
import type {
  AnalyticsContextTypes,
  AnalyticsData,
} from "../types/Provider/analyticsProvider";

const AnalyticsContext = createContext<AnalyticsContextTypes>(
  DEFAULT_ANALYTICS_CONTEXT_VALUES
);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [initialStartDate, setInitialStartDate] = useState<string>("");
  const [initialEndDate, setInitialEndDate] = useState<string>("");
  const [isDateInitialized, setIsDateInitialized] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [isAnalyticsDataLoading, setIsAnalyticsDataLoading] =
    useState<boolean>(false);

  // picking up initial date range from database, this hook should run only one time when data is fetched
  useEffect(() => {
    if (isDateInitialized || isAnalyticsDataLoading || !analyticsData) return;
    const { startDate, endDate, minDate, maxDate } = analyticsData.data;
    setEndDate(dayjs(endDate).format("YYYY-MM-DD"));
    setStartDate(dayjs(startDate).format("YYYY-MM-DD"));
    setInitialStartDate(dayjs(minDate).format("YYYY-MM-DD"));
    setInitialEndDate(dayjs(maxDate).format("YYYY-MM-DD"));
    setIsDateInitialized(true);
  }, [isAnalyticsDataLoading, analyticsData, isDateInitialized]);

  // getting saved filters from cookies
  useEffect(() => {
    const savedAgeGroup = Cookies.get("ageGroup");
    const savedGender = Cookies.get("gender");
    const savedStartDate = Cookies.get("startDate");
    const savedEndDate = Cookies.get("endDate");

    if (savedAgeGroup) setAgeGroup(savedAgeGroup);
    if (savedGender) setGender(savedGender);
    if (savedStartDate) setStartDate(savedStartDate);
    if (savedEndDate) setEndDate(savedEndDate);
  }, []);

  // Function to reset filters and clear cookies
  const handleResetFilters = useCallback(() => {
    setAgeGroup("");
    setGender("");
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
    Cookies.remove("ageGroup");
    Cookies.remove("gender");
    Cookies.remove("startDate");
    Cookies.remove("endDate");
  }, [initialEndDate, initialStartDate]);

  return (
    <AnalyticsContext.Provider
      value={{
        ageGroup,
        setAgeGroup,
        startDate,
        setStartDate,
        gender,
        setGender,
        endDate,
        setEndDate,
        selectedFeature,
        setSelectedFeature,
        analyticsData,
        isAnalyticsDataLoading,
        initialStartDate,
        initialEndDate,
        handleResetFilters,
        setAnalyticsData,
        setIsAnalyticsDataLoading,
        setInitialStartDate,
        setInitialEndDate,
        isDateInitialized,
        setIsDateInitialized,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);

  if (!context)
    throw new Error(
      "useAnalyticsContext must be used within anAnalyticsProvider"
    );

  return context;
};
