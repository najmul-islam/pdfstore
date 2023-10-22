import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navbar/Navbar";
import AccountSettingsPage from "./pages/AccountPage";
import CreateAccountPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import MyDrivePage from "./pages/DrivePage";
import MyLikes from "./pages/LikePage";
import SignInPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/user/drive" element={<MyDrivePage />} />
        <Route path="/user/likes" element={<MyLikes />} />
        <Route path="/user/upload" element={<UploadPage />} />

        <Route path="/auth/signup" element={<CreateAccountPage />} />
        <Route path="/auth/signin" element={<SignInPage />} />
        <Route path="/auth/forgot" element={<ForgotPasswordPage />} />
        <Route path="/auth/edit" element={<AccountSettingsPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
