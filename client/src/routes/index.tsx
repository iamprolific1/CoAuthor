import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/pre_landing_page/Home";
import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Dashboard from "../pages/dashboard/Dashboard";
import EditorPage from "../pages/editorPage/EditorPage";
import TextEditorPage from "../pages/TextEditorPage/TextEditorPage";

enum RoutePaths {
  Home = "/",
  Login = '/login',
  Signup = '/signup',
  ForgotPassword = '/forgot_password',
  Dashboard = '/dashboard',
  EditorPage = '/editor',
  TextEditorPage = '/text_editor'
}
export const PageRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={RoutePaths.Home} element={<LandingPage />} />
        <Route path={RoutePaths.Login} element={<Login />} />
        <Route path={RoutePaths.Signup} element={<Signup />} />
        <Route path={RoutePaths.ForgotPassword} element={<ForgotPassword />} />
        <Route path={RoutePaths.Dashboard} element={<Dashboard />} />
        <Route path={RoutePaths.EditorPage} element={<EditorPage />} />
        <Route path={RoutePaths.TextEditorPage} element={<TextEditorPage />} />

      </Routes>
    </>
  );
};
