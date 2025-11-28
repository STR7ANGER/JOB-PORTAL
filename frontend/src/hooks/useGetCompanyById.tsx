import { setCompany } from "@/store/companySlice";
import { API_URL } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCompanyById = (companyId: string | undefined) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!companyId) return;
    
    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${API_URL}/company/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompany(res.data.company));
        }
      } catch (error) {
        console.error("Error in fetching company:", error);
      }
    };
    fetchCompany();
  }, [dispatch, companyId]);
};

export default useGetCompanyById;

