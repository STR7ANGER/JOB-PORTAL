import { setSingleJob } from "@/store/jobSlice";
import { API_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleJob = (jobId: string) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${API_URL}/job/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
        dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.error("Error in fetching jobs:", error);
      }
    };
    fetchSingleJob();
  }, [dispatch]);
};

export default useGetSingleJob;
