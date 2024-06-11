import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const action = async ({ params }) => {
  // console.log(params.id);
  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Job deleted Successfully");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return redirect("/dashboard/all-jobs");
};
