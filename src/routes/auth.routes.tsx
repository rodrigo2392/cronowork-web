import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/Auth/Login";
import RegisterPage from "../views/Auth/Register";
import NotFound from "../views/NotFound";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
