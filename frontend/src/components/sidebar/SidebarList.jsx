import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarListItem from "./SidebarListItem";
import {
  List,
  Divider,
  Box,
  Button,
  useTheme,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  AccessTimeOutlined,
  BarChartOutlined,
  VideoLibraryOutlined,
  MovieOutlined,
  SmartDisplayOutlined,
  MovieFilterOutlined,
  MusicVideoOutlined,
  ExitToApp,
  Home,
  TrendingUp,
  AppRegistration,
  ContactPage,
  Info,
  Feedback,
} from "@mui/icons-material";

const SidebarList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <>
      <List>
        {/* <ListItem disablePadding>
          <ListItemButton>
            <ListItemText
              sx={{
                color: (theme) => theme.palette.text.primary,
                textAlign: "end",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Login
            </ListItemText>
            <ListItemIcon
              sx={{
                minWidth: "30px",
                marginLeft: "15px",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              <ExitToApp />
            </ListItemIcon>
          </ListItemButton>
        </ListItem> */}
        <SidebarListItem
          link="/login"
          icon={<ExitToApp />}
          text="Login"
          // query="/latest/all"
        />

        {/* <Button
          component={Link}
          to="/login"
          variant="outlined"
          endIcon={<ExitToApp />}
          sx={{
            textTransform: "none",
            // borderRadius: "20px",
            right: "0",
            width: "105px",
            outlineColor: isDarkMode ? "#28384F" : "#DFF1FE",
            borderColor: isDarkMode ? "#28384F" : "#DFF1FE",
            color: isDarkMode ? "#3ea6ff" : "#065fd4",
            "&:hover": {
              background: isDarkMode ? "#28384F" : "#DFF1FE",
              outlineColor: isDarkMode ? "#28384F" : "#DFF1FE",
              borderColor: isDarkMode ? "#28384F" : "#DFF1FE",
            },
          }}
        >
          Sing in
        </Button> */}
      </List>
      <Divider />
      <List sx={{ paddingTop: "0" }}>
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
    </>
  );
};

export default SidebarList;
