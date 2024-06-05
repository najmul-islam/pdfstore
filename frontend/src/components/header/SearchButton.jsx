import { SearchRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const SearchButton = ({ handleShowSearchBox }) => {
  return (
    <IconButton onClick={() => handleShowSearchBox(true)}>
      <SearchRounded sx={{ fontSize: "25px", display: { md: "none" } }} />
    </IconButton>
  );
};

export default SearchButton;
