import { Routes, Route } from 'react-router-dom';
import LoginPage from '../views/Auth/Login';
import NotFound from '../views/NotFound';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
