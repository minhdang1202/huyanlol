import { withStyles } from "@material-ui/core";
import MuiToggleButton from "@material-ui/lab/ToggleButton";

const ToggleButton = withStyles(() => ({
  root: {
    border: "none",
    padding: 0,
    borderRadius: 5,
    "&:hover": {
      background: "none",
    },
  },
  selected: {
    backgroundColor: "transparent !important",
  },
}))(MuiToggleButton);

export default ToggleButton;
