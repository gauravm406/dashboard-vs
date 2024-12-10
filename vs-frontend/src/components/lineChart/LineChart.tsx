import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { useAnalyticsContext } from "../../providers/AnalyticsProvider";
import { useMemo } from "react";
import dayjs from "dayjs";
import type { FeatureData } from "../../types/chartTypes";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const LineChart = () => {
  const { analyticsData, selectedFeature } = useAnalyticsContext();

  const selectedFeatureData: FeatureData = useMemo(() => {
    return (
      analyticsData?.data?.features.find(
        ({ feature }) => feature === selectedFeature
      ) ?? {}
    );
  }, [analyticsData, selectedFeature]);

  const totalTimeSpentData = useMemo(() => {
    return (
      selectedFeatureData?.dateData?.map(
        ({ totalTimeSpent }: { totalTimeSpent: number }) => totalTimeSpent
      ) ?? []
    );
  }, [selectedFeatureData]);

  const datesData = useMemo(() => {
    return (
      selectedFeatureData?.dateData?.map(({ date }) =>
        dayjs(date).format("YYYY-MM-DD")
      ) ?? []
    );
  }, [selectedFeatureData]);

  const data = {
    labels: datesData, // X-axis labels
    datasets: [
      {
        label: "Total time", // Dataset label
        data: totalTimeSpentData, // Y-axis data
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Area fill color under the line
        tension: 0, // Curve smoothness (0 for straight lines)
        pointBackgroundColor: "rgba(75, 192, 192, 1)", // Point color
        pointBorderColor: "#fff", // Point border color
        pointHoverRadius: 6, // Point hover size
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Daily time data", // Chart title
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Dates", // X-axis title
        },
      },
      y: {
        title: {
          display: true,
          text: "Total time spent", // Y-axis title
        },
        beginAtZero: true, // Start Y-axis from zero
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
