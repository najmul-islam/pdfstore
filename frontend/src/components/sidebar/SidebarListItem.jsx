import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleListitem } from "../../features/theme/themeSlice";

const SidebarListItem = ({ link, icon, text, ...props }) => {
  const { selectedUrl } = useSelector((state) => state.theme);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleListItem = (link) => {
    navigate(link);
    dispatch(toggleListitem(link));
  };

  return (
    <>
      <ListItem onClick={() => handleListItem(link)} disablePadding>
        <ListItemButton selected={selectedUrl === link}>
          <ListItemText
            {...props}
            sx={{
              color: (theme) => theme.palette.text.primary,
              textAlign: "end",
            }}
          >
            {text}
          </ListItemText>
          <ListItemIcon
            sx={{
              minWidth: "30px",
              marginLeft: "15px",
              color: (theme) => theme.palette.text.primary,
            }}
          >
            {icon}
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
    </>
  );
};

export default SidebarListItem;
