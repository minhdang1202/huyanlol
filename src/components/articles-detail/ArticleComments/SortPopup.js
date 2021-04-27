import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const SortPopup = ({ onClose, sortValue, radioList, onChangeSort, ...otherProps }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const [value, setValue] = useState(sortValue);

  const onChange = e => {
    setValue(parseInt(e.target.value));
  };

  const onSubmitChange = () => {
    onChangeSort(parseInt(value));
    onClose();
  };

  return (
    <Dialog classes={{ paper: classes.root }} {...otherProps}>
      <DialogTitle className={classes.title}>
        <Typography variant="h6" component="div">
          {getLabel("L_COMMENT_ARRANGE")}
        </Typography>
        <IconButton className={classes.closeButton} onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <RadioGroup value={value} onChange={onChange}>
          {radioList.map((radio, index) => (
            <FormControlLabel
              key={index}
              value={radio.value}
              control={<StyledRadio />}
              label={radio.label}
              labelPlacement="start"
              classes={{ root: classes.formLabelRoot }}
            />
          ))}
        </RadioGroup>
        <Button
          size="large"
          variant="contained"
          className={clsx("dark-blue-button", classes.arrangeButton)}
          onClick={onSubmitChange}
        >
          {getLabel("TXT_ARRANGE")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

SortPopup.propTypes = {
  onClose: PropTypes.func,
  onChangeSort: PropTypes.func,
  sortValue: PropTypes.number,
  radioList: PropTypes.array,
};

const StyledRadio = props => {
  const classes = useStyles();
  return (
    <Radio
      className={classes.radio}
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: 345,
    maxWidth: "90%",
    height: 316,
    margin: "auto",
  },
  closeButton: {
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.5),
    marginRight: theme.spacing(-1.5),
  },
  title: {
    boxShadow: `0px 1px 0px ${theme.palette.divider}`,
    "&>*:nth-child(1)": {
      width: "100%",
      margin: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  content: {
    position: "relative",
  },
  arrangeButton: {
    width: "calc(100% - 24px * 2)",
    minHeight: 45,
    position: "absolute",
    bottom: theme.spacing(3),
  },
  formLabelRoot: {
    justifyContent: "space-between",
    marginLeft: 0,
  },
  radio: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: "50%",
    width: 19,
    height: 19,
  },
  checkedIcon: {
    border: `1px solid ${theme.palette.primary.main}`,
    position: "relative",
    "&:before": {
      display: "block",
      width: 15,
      height: 15,
      borderRadius: "50%",
      position: "absolute",
      top: 1,
      left: 1,
      background: theme.palette.primary.main,
      content: '""',
    },
  },
}));

export default SortPopup;
