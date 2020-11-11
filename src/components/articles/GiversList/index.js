import React from "react";
import { Typography, makeStyles, DialogContent, Divider, Box } from "@material-ui/core";
import StringFormat from "string-format";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Dialog from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import DialogActions from "components/DialogLayout/DialogActions";
import Giver from "./Giver";

const GiversList = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  return (
    <Dialog open={isOpen} onBackdropClick={() => onClose()}>
      <DialogTitle title={getLabel("TXT_GIVERS")} onClose={() => onClose()} />
      <DialogActions className={classes.action}>
        <Typography variant="subtitle1">
          {StringFormat(getLabel("FM_GIVERS_BY"), DEMO_GIVERS_TOTAL, DEMO_USERS_TOTAL)}
        </Typography>
      </DialogActions>
      <DialogContent>
        {DEMO_GIVERS_LIST.map((giver, index) => (
          <Box key={index}>
            <Giver {...giver} />
            {index !== DEMO_GIVERS_LIST.length - 1 ? <Divider /> : null}
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
};

const DEMO_GIVERS_TOTAL = 345;
const DEMO_USERS_TOTAL = 35;
const DEMO_GIVERS_LIST = Array(10).fill({
  name: "Richard Brown",
  giver: 10,
  avatar: "/images/img-demo-avatar.jpg",
  isFollowing: true,
});

GiversList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  action: {
    "& > *": {
      marginRight: "auto",
    },
  },
}));

export default GiversList;
