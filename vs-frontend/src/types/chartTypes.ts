import type { Chart, ChartEvent } from "chart.js";

export type HandleFeatureSelect = (
  event: ChartEvent,
  elements: { index: number; datasetIndex?: number }[],
  chart: Chart
) => void;

export type OnHoverHandler = (
  event: ChartEvent,
  elements: { index: number; datasetIndex?: number }[]
) => void;

export type DateEntry = {
  date: string;
  totalTimeSpent: number;
};

export type FeatureData = {
  dateData?: DateEntry[];
  feature?: string;
  overallTotalTimeSpent?: number;
};
