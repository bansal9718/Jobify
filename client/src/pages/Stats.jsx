import ChartsContainer from "../components/ChartsContainer";
import StatsContainer from "../components/StatsContainer";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs/statss");
    return response.data;
  },
};
export const loader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return null;
};

const stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();
  // console.log(monthlyApplications);

  const { data } = useQuery(statsQuery);

  const { defaultStats, monthlyApplications } = data;

  // return <h1>react query </h1>;

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
