import React, { useState } from "react";
import { Typography, Box, Button, Paper, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import clsx from "clsx";
import Lender from "./Lender";
import LenderList from "../LenderList";

const BookLenders = ({ lendersList, totalLenders }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const onOpenLenderList = () => {
    setIsOpen(true);
  };

  const onCloseLenderList = () => {
    setIsOpen(false);
  };

  return (
    <>
      <LenderList isOpen={isOpen} onClose={onCloseLenderList} />
      <Paper className={clsx("paper", classes.root)}>
        <Box>
          <Typography variant="h6">{totalLenders + " " + getLabel("TXT_BOOKDETAIL_LENDERS_TITLE")}</Typography>
          <Button size="medium" variant="text" onClick={onOpenLenderList}>
            {getLabel("TXT_BOOKDETAIL_SEE_MORE")}
          </Button>
        </Box>
        <Box>
          {lendersList.map((lender, index) => {
            return <Lender key={index} {...lender} />;
          })}
        </Box>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    "& button": {
      color: `${theme.palette.primary.main} !important`,
    },
    "&>*:first-child": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textTransform: "lowercase",
    },
    "&>*:nth-child(2)": {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridGap: theme.spacing(0.5),
    },
  },
}));

BookLenders.propTypes = {
  lendersList: PropTypes.array,
  totalLenders: PropTypes.number,
};

export default BookLenders;
