import { Route, Routes } from "react-router-dom";
// layout
import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";

// public page
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// user page
import AboutPage from "../pages/AboutPage";
import AccountPage from "../pages/AccountPage";
import CategoriesPage from "../pages/CategoriesPage";
import CategoryPage from "../pages/CategoryPage";
import ContactUs from "../pages/ContactUs";
import DrivePage from "../pages/DrivePage";
import Feedback from "../pages/Feedback";
import LikePage from "../pages/LikePage";
import TermsAndPrivacy from "../pages/TermsAndPrivacy";
import UploadPage from "../pages/UploadPage";

const Router = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path="/" element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/category" element={<CategoriesPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms-and-privacy" element={<TermsAndPrivacy />} />
        <Route path="/feedback" element={<Feedback />} />
      </Route>

      {/* user route */}
      <Route path="/user/*" element={<UserLayout roles={["user"]} />}>
        <Route path="my-drive" element={<DrivePage />} />
        <Route path="my-likes" element={<LikePage />} />
        <Route path="my-account" element={<AccountPage />} />
        <Route path="upload" element={<UploadPage />} />
      </Route>
    </Routes>
  );
};
export default Router;
