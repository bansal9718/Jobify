import ChartsContainer from "../components/ChartsContainer";
import StatsContainer from "../components/StatsContainer";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async (req, res) => {
  try {
    const response = await customFetch.get("/jobs/stats");
    // console.log(response);
    return response.data;
  } catch (error) {
    return error;
  }
};
const stats = () => {
  const { defaultStats, monthlyApplications } = useLoaderData();
  // console.log(monthlyApplications);
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
};

export default stats;
