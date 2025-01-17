import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/pre_landing_page/Home";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import ForgotPassword from "../pages/auth/forgotPassword";

enum RoutePaths {
  Home = "/",
  Login = '/login',
  Signup = '/signup',
  ForgotPassword = '/forgot_password'

}
export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={RoutePaths.Home} element={<LandingPage />} />
        <Route path={RoutePaths.Login} element={<Login />} />
        <Route path={RoutePaths.Signup} element={<Signup />} />
        <Route path={RoutePaths.ForgotPassword} element={<ForgotPassword />} />

      </Routes>
    </>
  );
};
