import palette from "./palette";
import typography from "./typography";
import breakpoints from "./breakpoints";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette,
  typography,
  breakpoints,
});

export default theme;
