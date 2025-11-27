import { Route, Routes } from "react-router-dom";
import Home from "@/components/Home";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Jobs from "@/components/Jobs";
import Browse from "@/components/Browse";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/browse" element={<Browse />} />
    </Routes>
  );
};

export default AppRoutes;
