import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useCallback, useMemo } from "react";
import { useAnalyticsContext } from "../../providers/AnalyticsProvider";
import { useNavigate } from "react-router-dom";
import { APP_ENDPOINTS } from "../../constants/AppEndpoints";
import type {
  HandleFeatureSelect,
  OnHoverHandler,
} from "../../types/chartTypes";

// Register required modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const navigate = useNavigate();
  const { analyticsData, setSelectedFeature } = useAnalyticsContext();

  const handleFeatureSelect: HandleFeatureSelect = useCallback(
    (event, elements, chart) => {
      if (elements.length > 0) {
        const element = elements[0];
        if (element && element.datasetIndex !== undefined) {
          const labels = chart.data.labels;
          if (labels && labels[element.index] !== undefined) {
            const label = labels[element.index];
            setSelectedFeature(label as string);
            navigate(`${APP_ENDPOINTS.FEATURE}`);
          }
        }
      }
    },
    [setSelectedFeature, navigate]
  );

  const onHoverHandler: OnHoverHandler = (event, elements) => {
    if (event.native?.target) {
      const target = event.native.target as HTMLElement;
      target.style.cursor = elements.length > 0 ? "pointer" : "default";
    }
  };

  const yAxisLabels = useMemo(
    () =>
      analyticsData?.data?.features
        .map(({ feature }: { feature: string }) => feature)
        .reverse(),
    [analyticsData]
  );

  const xAxisData = useMemo(
    () =>
      analyticsData?.data?.features
        .map(
          ({ overallTotalTimeSpent }: { overallTotalTimeSpent: number }) =>
            overallTotalTimeSpent
        )
        .reverse(),
    [analyticsData]
  );

  const data = {
    labels: yAxisLabels, // Y-axis labels
    datasets: [
      {
        label: "Time Spent",
        data: xAxisData, // X-axis data
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Bar color
        borderColor: "rgba(54, 162, 235, 1)", // Border color
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    indexAxis: "y", // Makes the bar chart horizontal
    responsive: true,
    maintainAspectRatio: false, // Allows custom height
    plugins: {
      legend: {
        position: "top", // Position of the legend
      },
      title: {
        display: true,
        text: "Total Time Spent by Feature", // Chart title
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Total time Spent", // X-axis title
          font: {
            size: 14, // Optional: Customize font size
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Features", // Y-axis title
          font: {
            size: 14, // Optional: Customize font size
          },
        },
      },
    },
    onClick: handleFeatureSelect,
    onHover: onHoverHandler,
  };

  if (!analyticsData) return <></>;

  return <Bar data={data} options={options} />;
};

export default BarChart;
