import React, { useState } from "react";
import { Typography, Box, Button, Paper, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import clsx from "clsx";
import Lender from "./Lender";
import LenderList from "../LenderList";

const BookLenders = () => {
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
          <Typography variant="h6">{TOTAL_LENDERS_DEMO + " " + getLabel("TXT_BOOKDETAIL_LENDERS_TITLE")}</Typography>
          <Button size="medium" variant="text" onClick={onOpenLenderList}>
            {getLabel("TXT_BOOKDETAIL_SEE_MORE")}
          </Button>
        </Box>
        <Box>
          {LENDER_DEMO.map((lender, index) => {
            return <Lender key={index} {...LENDER_DEMO[index]} />;
          })}
        </Box>
      </Paper>
    </>
  );
};

const LENDER_DEMO = Array(4).fill({
  name: "Trần Việt Phú",
  avatar: "/images/img-demo-avatar.jpg",
  address: "34 Trần Nhân Tông",
  distance: "3.5km",
});

const TOTAL_LENDERS_DEMO = 135;

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

export default BookLenders;
