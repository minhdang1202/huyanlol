import React from "react";
import { Avatar as MuiAvatar, withStyles } from "@material-ui/core";
import { AvatarIcon } from "icons";

const Avatar = withStyles(() => ({
  root: {
    "& svg": {
      width: "100%",
      height: "100%",
    },
  },
  colorDefault: {
    background: "none",
  },
}))(props => (
  <MuiAvatar {...props}>
    <AvatarIcon />
  </MuiAvatar>
));

export default Avatar;
