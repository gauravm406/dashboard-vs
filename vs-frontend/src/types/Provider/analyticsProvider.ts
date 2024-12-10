export type AnalyticsDateData = {
  date: string;
  totalTimeSpent: number;
};

export type AnalyticsFeatureData = {
  dateData: AnalyticsDateData[];
  overallTotalTimeSpent: number;
  feature: string;
};

export type AnalyticsData = {
  data: {
    endDate: string;
    startDate: string;
    minDate: string;
    maxDate: string;
    features: AnalyticsFeatureData[];
  };
  status: boolean;
  msg: string;
};

export type AnalyticsContextTypes = {
  ageGroup: string;
  setAgeGroup: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  selectedFeature: string | null;
  setSelectedFeature: React.Dispatch<React.SetStateAction<string | null>>;
  initialStartDate: string;
  setInitialStartDate: React.Dispatch<React.SetStateAction<string>>;
  initialEndDate: string;
  setInitialEndDate: React.Dispatch<React.SetStateAction<string>>;
  isDateInitialized: boolean;
  setIsDateInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  analyticsData: AnalyticsData | null;
  setAnalyticsData: React.Dispatch<React.SetStateAction<AnalyticsData | null>>;
  isAnalyticsDataLoading: boolean;
  setIsAnalyticsDataLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleResetFilters: () => void;
};
