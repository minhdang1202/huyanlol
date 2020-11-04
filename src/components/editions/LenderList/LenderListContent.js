import React from "react";
import PropTypes from "prop-types";
import { Divider, Box } from "@material-ui/core";
import Lender from "./Lender";

const LenderListContent = ({ lenderList }) => {
  return (
    <Box>
      {lenderList.map((lender, index) => {
        return (
          <Box key={index}>
            <Lender {...lender} />
            {index !== lenderList.length - 1 ? <Divider /> : null}
          </Box>
        );
      })}
    </Box>
  );
};

LenderListContent.propTypes = {
  lenderList: PropTypes.array,
};

export default LenderListContent;
