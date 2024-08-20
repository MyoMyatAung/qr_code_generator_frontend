import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import { RoutesPath } from "./libs/constants";
import Toast from "./components/shared/Toast";
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/auth/AuthPage";
import AllQrPage from "./pages/QR/AllQrPage";
import ActiveQRPage from "./pages/QR/ActiveQRPage";
import PauseQRPage from "./pages/QR/PauseQRPage";
import CreateQRPage from "./pages/QR/CreateQRPage";
import QRDetailPage from "./pages/QR/QRDetailPage";
import EditQrPage from "./pages/QR/EditQrPage";

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
            <Route path={`${RoutesPath.QR}/${RoutesPath.ID}`} element={<QRDetailPage />} />
            <Route path={RoutesPath.ACTIVE} element={<ActiveQRPage />} />
            <Route path={RoutesPath.PAUSED} element={<PauseQRPage />} />
            <Route path={RoutesPath.CREATE} element={<CreateQRPage />} />
            <Route path={`${RoutesPath.EIDT}/${RoutesPath.ID}`} element={<EditQrPage />} />
          </Route>
          <Route path={RoutesPath.AUTH} element={<AuthPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
