import { setAppliedJobs } from "@/store/applicationSlice";
import { API_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${API_URL}/application/applied`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.error("Error in fetching applied jobs:", error);
      }
    };
    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;

