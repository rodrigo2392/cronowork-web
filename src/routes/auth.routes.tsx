import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LoginPage from '../views/Auth/Login'
import RegisterPage from '../views/Auth/Register'
import NotFound from '../views/NotFound'
import AuthLayout from '../layouts/auth.layout'

export default function AuthRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
