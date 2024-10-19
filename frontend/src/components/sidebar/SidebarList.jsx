import SidebarListItem from "./SidebarListItem";
import { List, Divider, Button } from "@mui/material";
import {
  Home,
  ExitToApp,
  TrendingUp,
  AppRegistration,
  ContactPage,
  Info,
  Feedback,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const SidebarList = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <List sx={{ paddingY: "0" }}>
        <SidebarListItem link="/" icon={<Home />} text="Home" />
        <SidebarListItem
          link="/category/most-popular"
          icon={<TrendingUp />}
          text="Most Popular"
        />
        <SidebarListItem
          link="/category/editor's-picks"
          icon={<AppRegistration />}
          text="Editor's Picks"
        />

        <SidebarListItem
          link="/contact"
          icon={<ContactPage />}
          text="Contact"
        />

        <SidebarListItem link="/about" icon={<Info />} text="About us" />

        <SidebarListItem link="/feedback" icon={<Feedback />} text="Feedback" />
      </List>
      <Divider />

      {user ? (
        <List sx={{ paddingY: 0 }}>
          {/* <Button
            size="xl"
            fullWidth
            handleClick={handleLogout}
            endIcon={<ExitToApp />}
          >
            Logout
          </Button> */}
          <SidebarListItem
            link="/"
            icon={<ExitToApp />}
            text="Logout"
            onClick={handleLogout}
          />
        </List>
      ) : (
        <List sx={{ paddingY: 0 }}>
          <SidebarListItem link="/login" icon={<ExitToApp />} text="Login" />
        </List>
      )}
    </>
  );
};

export default SidebarList;
