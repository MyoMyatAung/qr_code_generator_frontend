import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import { RoutesPath } from "./libs/constants";
import Toast from "./components/shared/Toast";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/auth/AuthPage";
import AllQrPage from "./pages/QR/AllQrPage";
import ActiveQRPage from "./pages/QR/ActiveQRPage";
import PauseQRPage from "./pages/QR/PauseQRPage";

function App() {
  return (
    <>
      <Toast />
      <BrowserRouter>
        <Routes>
          <Route path={RoutesPath.ADMINS} element={<RootLayout />}>
            <Route
              index={true}
              element={<AdminPage />}
            />
            <Route path={RoutesPath.ALL} element={<AllQrPage />} />
            <Route path={RoutesPath.ACTIVE} element={<ActiveQRPage />} />
            <Route path={RoutesPath.PAUSED} element={<PauseQRPage />} />
          </Route>
          <Route path={RoutesPath.AUTH} element={<AuthPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
