import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { toggleListitem } from "../../features/theme/themeSlice";

const ProfileListItem = ({ link, icon, text }) => {
  const { selectedUrl } = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListItem = (link) => {
    dispatch(toggleListitem(link));
  };
  return (
    <ListItem onClick={() => navigate(link)} disablePadding>
      <ListItemButton
        selected={selectedUrl === link}
        onClick={() => handleListItem(link)}
      >
        <ListItemIcon sx={{ minWidth: "35px" }}>{icon}</ListItemIcon>
        <ListItemText>{text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default ProfileListItem;
