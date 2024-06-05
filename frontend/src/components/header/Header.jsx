import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { userApi } from "../../features/user/userApi";
import MobileSearchBox from "./MobileSearchBox";
import SearchBox from "./SearchBox";
import SearchButton from "./SearchButton";
import Profile from "./Profile";
import SigninButton from "./SigninButton";
import ProfileSkeleton from "./ProfileSkeleton";
import { toggleSidebar } from "../../features/theme/themeSlice";
import { Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const { sidebar } = useSelector((state) => state.theme);
  const isMd = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [showSerachBox, setShowSearchBox] = useState(false);
  const [showMobileToolbar, setShowMobileToolbar] = useState(false);

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowSearchBox = (value) => {
    setShowSearchBox(value);
    setShowMobileToolbar(value);
  };

  useEffect(() => {
    if (isMd) {
      setShowMobileToolbar(false);
      setShowSearchBox(true);
    } else {
      setShowSearchBox(false);
      setShowMobileToolbar(showSerachBox);
    }
  }, [isMd, showSerachBox]);

  useEffect(() => {
    if (user) {
      dispatch(userApi.endpoints.getUser.initiate())
        .unwrap()
        .then((data) => {
          setProfile(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, [dispatch, user]);

  const handleSidebar = (value) => {
    dispatch(toggleSidebar(value));
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        boxShadow: 0,
        background: (theme) => theme.palette.background.default,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="lg">
        {showMobileToolbar ? (
          <MobileSearchBox handleShowSearchBox={handleShowSearchBox} />
        ) : (
          <Toolbar
            disableGutters
            sx={{
              height: "65px",
              // paddingX: "18px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <IconButton
              aria-label="open drawer"
              size="large"
              edge="start"
              onClick={() => handleSidebar(!sidebar)}
              sx={{ mr: 2, display: { xs: "inline-flex", md: "none" } }}
            >
              <Menu />
            </IconButton>

            <Box
              component="img"
              src="/pdfstore.png"
              onClick={() => navigate("/")}
              alt="pdf store"
              sx={{ height: "40px", cursor: "pointer" }}
            />

            <SearchBox />

            {user ? (
              <Stack
                spacing={1}
                direction="row"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box width="100%" sx={{ display: { xs: "block", md: "none" } }}>
                  <SearchButton handleShowSearchBox={handleShowSearchBox} />
                </Box>

                {isLoading ? <ProfileSkeleton /> : <Profile user={profile} />}
              </Stack>
            ) : (
              <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ display: { xs: "block", md: "none" } }}>
                  <SearchButton handleShowSearchBox={handleShowSearchBox} />
                </Box>
                <SigninButton />
              </Stack>
            )}
          </Toolbar>
        )}
      </Container>
    </AppBar>
  );
};

export default Header;
