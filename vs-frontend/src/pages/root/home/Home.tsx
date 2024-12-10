import BarChart from "../../../components/barchart/BarChart";
import { useAnalyticsContext } from "../../../providers/AnalyticsProvider";
import s from "./home.module.css";

const Home = () => {
  const { isAnalyticsDataLoading } = useAnalyticsContext();

  return (
    <div className={s.home}>
      {isAnalyticsDataLoading ? (
        <p className={s.loading_text}>...Loading</p>
      ) : (
        <div className={s.home_main}>
          <div className={s.chart_wrapper}>
            <BarChart />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
