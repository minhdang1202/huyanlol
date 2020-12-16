import React from "react";
import { Box } from "@material-ui/core";

const UserMention = ({ children }) => {
  return (
    <Box component="span" color="primary.main">
      {children}
    </Box>
  );
};

export default UserMention;
