import { Routes, Route } from 'react-router-dom';
import HomePage from '../views/App/Home';
import ProjectsPage from '../views/App/Projects';
import ClientsPage from '../views/App/Clients';
import NotFound from '../views/NotFound';

export default function AppRoutes() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
