import { useSelector } from "react-redux";
import { ThemeProvider as Theme, createTheme } from "@mui/material/styles";

const ThemeProvider = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#0F0F0F",
        paper: "#0F0F0F",
        primary: "#0F0F0F",
        secondary: "#282828",
      },
      text: {
        primary: "#f1f1f1",
        secondary: "#aaaaaa",
      },
      action: {
        hover: "#272727",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });
  const lightTheme = createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#ffffff",
        paper: "#ffffff",
        primary: "#ffffff",
        secondary: "#E5E5E5",
      },
      text: {
        primary: "#0f0f0f",
        secondary: "#606060",
      },
      action: {
        hover: "#f2f2f2",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
  });

  return (
    <Theme theme={mode === "dark" ? darkTheme : lightTheme}>{children}</Theme>
  );
};

export default ThemeProvider;
