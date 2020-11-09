import palette from "../palette";
import { createMuiTheme } from "@material-ui/core";
const theme = createMuiTheme();

const smallStyles = {
  fontSize: 10,
};

const mediumStyles = {
  fontSize: 16,
};

export default {
  iconEmpty: {
    color: palette.grey[300],
  },
  root: {
    color: palette.rating.active,
    ...mediumStyles,
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
  sizeSmall: smallStyles,
};
