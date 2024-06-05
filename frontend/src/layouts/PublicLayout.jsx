import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const PublicLayout = () => {
  const { drawerWidth } = useSelector((state) => state.theme);
  return (
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
  );
};
export default PublicLayout;
