import blue from "@material-ui/core/colors/blue";
import grey from "@material-ui/core/colors/grey";
import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    light: {
      background: grey[50],
      secondary: grey[50],
      fontMain: grey[800],
      primary: blue[800],
      card: grey[100],
    },
    dark: {
      background: grey[900],
      secondary: grey[800],
      fontMain: grey[50],
      primary: grey[800],
      card: grey[800],
    },
  },
});
