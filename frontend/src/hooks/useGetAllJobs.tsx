import { setAllJobs } from "@/store/jobSlice";
import { API_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/job/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error("Error in fetching jobs:", error);
      }
    };
    fetchAllJobs();
  }, [dispatch]);
};

export default useGetAllJobs;
