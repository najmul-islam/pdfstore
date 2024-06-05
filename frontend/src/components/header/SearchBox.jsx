import { useEffect, useState } from "react";
import { Box, InputBase, IconButton, Tooltip } from "@mui/material";
import { Search as SearchIcon, Clear } from "@mui/icons-material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery !== "") {
      const formattedQuery = searchQuery.replace(/ /g, "+");
      navigate(`/search?title=${formattedQuery}`);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchParams("");
  };

  useEffect(() => {
    if (pathname === "/search") {
      const isSearchParams = searchParams.get("title");
      if (isSearchParams) {
        setSearchQuery(searchParams.get("title"));
      }
    }
  }, [searchParams, pathname]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flex="0 1 600px"
      alignItems="center"
      // borderRadius={2}
      paddingX={5}
      sx={{ display: { xs: "none", md: "flex" } }}
    >
      <Box width="100%" sx={{ position: "relative" }}>
        <InputBase
          fullWidth
          placeholder="Search book"
          name="search"
          value={searchQuery}
          onChange={handleSearch}
          sx={{
            paddingLeft: "20px",
            height: "40px",
            // borderRadius: "40px 0px 0px 40px",
            boxShadow: (theme) =>
              `inset 0 1px 5px ${theme.palette.background.secondary}`,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            "&:focus-within": { border: "1px solid #2962B7" },
          }}
        />

        {searchQuery === "" ? null : (
          <Tooltip title="clear search">
            <IconButton
              onClick={handleClear}
              sx={{ position: "absolute", right: "0" }}
            >
              <Clear />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Tooltip title="search">
        <Box
          component="button"
          type="submit"
          display="flex"
          height="40px"
          width="64px"
          alignItems="center"
          justifyContent="center"
          sx={{
            // borderRadius: "0 5px 5px 0",
            borderLeft: "0",
            cursor: "pointer",
            // background: (theme) => theme.palette.background.secondary,
            boxShadow: (theme) =>
              `inset 0 1px 5px ${theme.palette.background.secondary}`,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            "&:focus-within": { border: "1px solid #2962B7" },
            // color: (theme) => theme.palette.text.primary,
            // border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <SearchIcon
            sx={{
              fontSize: "25px",
              fontWeight: "400",
            }}
          />
        </Box>
      </Tooltip>
    </Box>
  );
};

export default SearchBox;
