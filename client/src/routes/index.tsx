import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Home";
enum RoutePaths {
    Home = '/'
}
export const PageRoutes = ()=> {
    return(
        <>
            <Routes>
                <Route path={RoutePaths.Home} element={<LandingPage />} />
            </Routes>
        </>
    );
}