import { type ChangeEvent, useCallback } from "react";
import { useAnalyticsContext } from "../../providers/AnalyticsProvider";
import s from "./dateRangeSelector.module.css";
import dayjs from "dayjs";
import Cookies from "js-cookie";

const DateRangeSelector = () => {
  const {
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    initialStartDate,
    initialEndDate,
  } = useAnalyticsContext();

  const handleStartDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setStartDate(e.target.value);
      Cookies.set("startDate", e.target.value, { expires: 7 });
    },
    [setStartDate]
  );

  const handleEndDateChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEndDate(e.target.value);
      Cookies.set("endDate", e.target.value, { expires: 7 });
    },
    [setEndDate]
  );

  return (
    <div className={s.date_range_wrapper}>
      <h2>Select Date Range</h2>

      <div className={s.date_input_wrapper}>
        <label htmlFor="startDate">Start Date: </label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          min={initialStartDate}
          max={dayjs(initialEndDate).subtract(1, "day").format("YYYY-MM-DD")}
        />
      </div>

      <div className={s.date_input_wrapper}>
        <label htmlFor="endDate">End Date: </label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          min={dayjs(startDate).add(1, "day").format("YYYY-MM-DD")}
          max={initialEndDate}
        />
      </div>
      <br />
    </div>
  );
};

export default DateRangeSelector;
