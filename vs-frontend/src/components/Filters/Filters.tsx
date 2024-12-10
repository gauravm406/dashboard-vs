import { type ChangeEvent, useCallback } from "react";
import { useAnalyticsContext } from "../../providers/AnalyticsProvider";
import CustomSelect from "../customSelect/CustomSelect";
import s from "./filters.module.css";
import DateRangeSelector from "../dateRangeSelector/DateRangeSelector";
import Cookies from "js-cookie";

const Filters = () => {
  const {
    setAgeGroup,
    setGender,
    handleResetFilters,
    ageGroup,
    gender,
    startDate,
    endDate,
  } = useAnalyticsContext();

  const changeAgeGroupHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAgeGroup(e.target.value);
      Cookies.set("ageGroup", e.target.value, { expires: 7 });
    },
    [setAgeGroup]
  );

  const changeGenderHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setGender(e.target.value);
      Cookies.set("gender", e.target.value, { expires: 7 });
    },
    [setGender]
  );

  const handleShareClick = useCallback(() => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams({
      ageGroup: ageGroup ?? "",
      gender: gender ?? "",
      startDate: startDate ?? "",
      endDate: endDate ?? "",
    } as Record<string, string>).toString();

    const shareableUrl = `${baseUrl}?${params}`;

    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        alert("Shareable link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        alert("Failed to copy the link. Please try again.");
      });
  }, [ageGroup, gender, startDate, endDate]);

  return (
    <div className={s.filters_container}>
      <div className={s.filters_container_wrapper}>
        <p>Filter by:</p>
        <CustomSelect
          label="Select age group"
          data={["15-25", ">25"]}
          onChange={changeAgeGroupHandler}
          value={ageGroup}
        />
        <CustomSelect
          label="Select gender"
          data={["male", "female"]}
          onChange={changeGenderHandler}
          value={gender}
        />
        <DateRangeSelector />
      </div>

      <div className={s.btns_wrapper}>
        <button onClick={handleResetFilters} type="button">
          Clear filters
        </button>
        <button onClick={handleShareClick} type="button">
          Share Chart
        </button>
      </div>
    </div>
  );
};

export default Filters;
