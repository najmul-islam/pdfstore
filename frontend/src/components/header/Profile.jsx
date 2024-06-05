import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { toggleColor } from "../../../features/theme/themeSlice";
import ProfileListItem from "./ProfileListItem";

import {
  Avatar,
  Menu,
  IconButton,
  Divider,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Badge,
} from "@mui/material";

import {
  AccountCircleOutlined,
  ExitToAppOutlined,
  CloudDownloadOutlined,
  ThumbUpAltOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
// import { apiSlice } from "../../../features/api/apiSlice";
import { logout } from "../../features/auth/authSlice";
import { toggleColor } from "../../features/theme/themeSlice";
import { apiSlice } from "../../features/api/apiSlice";

const Profile = ({ user }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const open = Boolean(anchorElUser);

  // const { user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    dispatch(apiSlice.util.resetApiState());
    dispatch(logout());
    navigate("/");
  };

  const handleColor = () => {
    dispatch(toggleColor(mode));
  };

  const invisible = true;

  return (
    <>
      <IconButton onClick={handleOpenUserMenu}>
        <Badge color="error" variant="dot" invisible={invisible}>
          <Avatar alt={user?.name?.toLowerCase()} src={user?.avatar} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorElUser}
        keepMounted
        open={open}
        onClose={handleCloseUserMenu}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            width: "300px",
            paddingTop: "0",
            paddingBottom: "0",
            background: (theme) => theme.palette.background.secondery,
          },
        }}
        sx={{ paddingTop: "0", paddingBottom: "0" }}
      >
        <ListItem
          onClick={() => navigate("/user/profile")}
          disablePadding
          sx={{
            paddingTop: "0",
            paddingBottom: "0",
          }}
        >
          <ListItemButton>
            <Avatar alt={user?.name?.toLowerCase()} src={user?.avatar} />
            <ListItemText sx={{ ml: 2 }}>{user?.name}</ListItemText>
          </ListItemButton>
        </ListItem>

        <Divider />

        <ProfileListItem
          link="/user/my-drive"
          icon={<CloudDownloadOutlined />}
          text="My Drive"
        />

        <ProfileListItem
          link="/user/my-likes"
          icon={<ThumbUpAltOutlined />}
          text="My Likes"
        />

        <ProfileListItem
          link="/user/upload"
          icon={<FileUploadOutlined />}
          text="Upload"
        />
        <ProfileListItem
          link="/user/my-account"
          icon={<AccountCircleOutlined />}
          text="Account"
        />
        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={onLogout}>
            <ListItemIcon sx={{ minWidth: "35px" }}>
              <ExitToAppOutlined />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </Menu>
    </>
  );
};

export default Profile;
