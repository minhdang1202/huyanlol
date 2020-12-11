import React, { memo } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import MuiPagination from "@material-ui/lab/Pagination";
import MuiPaginationItem from "@material-ui/lab/PaginationItem";

const CommonPagination = props => {
  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      color="primary"
      siblingCount={1}
      hidePrevButton
      hideNextButton
      renderItem={item => <PaginationItem {...item} />}
      {...props}
    />
  );
};

CommonPagination.propTypes = {
  count: PropTypes.number,
  page: PropTypes.number,
  onChange: PropTypes.func,
};
CommonPagination.defaultProps = {};

export default memo(CommonPagination);

const Pagination = withStyles({
  root: { marginTop: 30, marginBottom: 30 },
  ul: {
    justifyContent: "center",
  },
})(MuiPagination);

const PaginationItem = withStyles(theme => ({
  root: {
    color: theme.palette.grey[500],
    minWidth: 30,
    minHeight: 30,
    height: "max-content",
    borderRadius: 3,
    borderColor: theme.palette.grey[300],
    fontSize: 14,
    fontWeight: 500,
  },
  selected: {
    background: "#5aa4cc !important",
    color: "white !important",
  },
}))(MuiPaginationItem);
