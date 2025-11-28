import { Route, Routes } from "react-router-dom";
import Home from "@/components/Home";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import Jobs from "@/components/Jobs";
import Browse from "@/components/Browse";
import Profile from "@/components/Profile";
import JobDescription from "@/components/JobDescription";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/description/:id" element={<JobDescription />} />
    </Routes>
  );
};

export default AppRoutes;
