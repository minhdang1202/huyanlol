import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme();

export default {
  elevation1: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.082441)",
    borderRadius: 10,
    padding: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
};
