import Analytics from "../models/analytics.js";

// @GET
// "/api/analytics"
export const getAnalytics = async (req, res) => {
  const { ageGroup, gender, startDate, endDate } = req.query;

  try {
    const dateRange = await Analytics.aggregate([
      {
        $group: {
          _id: null,
          minDate: { $min: "$day" },
          maxDate: { $max: "$day" },
        },
      },
    ]);

    const minDate = dateRange[0]?.minDate;
    const maxDate = dateRange[0]?.maxDate;

    const defaultStartDate = minDate;
    const defaultEndDate = maxDate;

    const start = new Date(startDate || defaultStartDate);
    const end = new Date(endDate || defaultEndDate);

    const query = {};
    if (ageGroup) query.age = ageGroup;
    if (gender) query.gender = gender.toLowerCase();

    const features = await Analytics.aggregate([
      {
        $match: {
          day: { $gte: start, $lte: end },
          ...query,
        },
      },
      {
        $project: {
          day: 1,
          features: { $objectToArray: "$features" },
        },
      },
      {
        $unwind: "$features",
      },
      {
        $group: {
          _id: { feature: "$features.k", day: "$day" },
          totalTimeSpent: { $sum: "$features.v" },
        },
      },
      {
        $group: {
          _id: "$_id.feature",
          dateData: {
            $push: {
              date: "$_id.day",
              totalTimeSpent: "$totalTimeSpent",
            },
          },
          overallTotalTimeSpent: { $sum: "$totalTimeSpent" },
        },
      },
      {
        $addFields: {
          dateData: {
            $sortArray: {
              input: "$dateData",
              sortBy: { date: 1 },
            },
          },
        },
      },
      {
        $project: {
          feature: "$_id",
          dateData: 1,
          overallTotalTimeSpent: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          feature: 1,
        },
      },
    ]);

    res.status(200).json({
      msg: "success",
      status: true,
      data: {
        features,
        startDate: start,
        endDate: end,
        minDate,
        maxDate,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
