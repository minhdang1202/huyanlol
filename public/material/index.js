import palette from "./palette";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette,
  typography,
  breakpoints,
  overrides,
});

export default theme;
