import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from '../views/App/Home'
import ProjectsPage from '../views/App/Projects'
import ClientsPage from '../views/App/Clients'
import StopwatchPage from '../views/App/Stopwatch'
import NotFound from '../views/NotFound'
import AppLayout from '../layouts/app.layout'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/track" element={<StopwatchPage />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
