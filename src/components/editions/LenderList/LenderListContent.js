import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Divider } from "@material-ui/core";
import Lender from "./Lender";

const LenderListContent = ({ lenderList }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {lenderList.map((lender, index) => {
        return (
          <div key={index}>
            <Lender {...lender} />
            {index !== lenderList.length - 1 ? <Divider /> : null}
          </div>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {
  },
}));

LenderListContent.propTypes = {
  lenderList: PropTypes.array,
};

export default LenderListContent;
