import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const UserLayout = ({ roles = [] }) => {
  const { user } = useSelector((state) => state.auth);

  return !roles.length || roles.includes(user?.role) ? (
    <Box>
      <Header />
      <Sidebar />
      <Container maxWidth="lg">
        <Box
          component="main"
          // flexGrow={1}
          // width={{ sm: `calc(100%- ${drawerWidth}px)` }}
        >
          <CssBaseline />
          <Toolbar sx={{ height: "65px" }} />

          <Outlet />
        </Box>
      </Container>
    </Box>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default UserLayout;
