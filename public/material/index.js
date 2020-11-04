import palette from "./palette";
import typography from "./typography";
import overrides from "./overrides";
import breakpoints from "./breakpoints";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
  palette,
  typography,
  breakpoints,
  overrides,
});

theme = responsiveFontSizes(theme);

export default theme;
