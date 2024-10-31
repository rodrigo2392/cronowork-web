import { Routes, Route } from 'react-router-dom';
import HomePage from '../views/App/Home';
import NotFound from '../views/NotFound';

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
