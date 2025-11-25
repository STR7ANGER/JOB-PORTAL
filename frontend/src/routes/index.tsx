import { Route, Routes } from "react-router-dom";
import Home from "@/components/Home";
import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
