import LineChart from "../../../components/lineChart/LineChart";
import { useAnalyticsContext } from "../../../providers/AnalyticsProvider";
import s from "./feature.module.css";

const Feature = () => {
  const { isAnalyticsDataLoading } = useAnalyticsContext();

  return (
    <div className={s.home}>
      {isAnalyticsDataLoading ? (
        <p className={s.loading_text}>...Loading</p>
      ) : (
        <div className={s.home_main}>
          <div className={s.chart_wrapper}>
            <LineChart />
          </div>
        </div>
      )}
    </div>
  );
};

export default Feature;
