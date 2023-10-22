import { Routes, Route } from "react-router-dom";
// layout
import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";

// public page
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// user page
import DrivePage from "../pages/DrivePage";
import LikePage from "../pages/LikePage";
import AccountPage from "../pages/AccountPage";
import UploadPage from "../pages/UploadPage";

const Router = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* user route */}
      <Route path="/user/*" element={<UserLayout roles={["user"]} />}>
        <Route path="drive" element={<DrivePage />} />
        <Route path="like" element={<LikePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="upload" element={<UploadPage />} />
      </Route>
    </Routes>
  );
};
export default Router;
