import { createTheme } from "@mui/material/styles";
import { blueGrey, teal } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      light: teal[50],
      main: teal[500],
    },
    secondary: {
      main: blueGrey[500],
    },
  },
});
