import React from "react";
import { makeStyles, Typography, Box, Avatar } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const StagesGatWent = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);
  const STATISTICS_LIST = [
    {
      imgSrc: "/images/img-user.png",
      quantity: getLabel("TXT_ACCOUNT_IS_REGISTERED_QUANTITY"),
      content: getLabel("TXT_ACCOUNT_IS_REGISTERED"),
    },
    {
      imgSrc: "/images/img-book-share.png",
      quantity: getLabel("TXT_SHARE_BOOK_QUANTITY"),
      content: getLabel("TXT_SHARE_BOOK"),
    },
    {
      imgSrc: "/images/img-tick.png",
      quantity: getLabel("TXT_BOOK_LOAN_SUCCESS_QUANTITY"),
      content: getLabel("TXT_BOOK_LOAN_SUCCESS"),
    },
  ];
  const PRIZE_LIST = [getLabel("TXT_PRIZE_UNLIMITED_CREATIVITY"), getLabel("TXT_PRIZE_AVIVA_COMMUNITY")];

  return (
    <Box className={clsx(classes.flexColumn, classes.root)}>
      <Typography variant="h4">{getLabel("TXT_GAT_ON_THE_RUNWAY")}</Typography>
      <Typography className="semiBold-lg-txt">{getLabel("TXT_STAGES_GAT_WENT")}</Typography>

      <Box className={clsx(classes.spaceBetweenRow, classes.statisticsList)}>
        {STATISTICS_LIST.map(({ imgSrc, quantity, content }, index) => (
          <Box key={`statistics-${index}`} className={clsx(classes.spaceBetweenRow, classes.statisticsItem)}>
            <Avatar variant="square" src={imgSrc} className={classes.image} />
            <Box className={classes.flexColumn}>
              <Typography variant="h4">{quantity}</Typography>
              <Typography className="semiBold-lg-txt">{content}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box width="100%" className={classes.prizeList}>
        {PRIZE_LIST.map((prizeItem, index) => (
          <Box mb={1} key={`prize-${index}`} className={classes.prizeItem}>
            <Avatar variant="square" src="./images/img-cup.png" />
            <Typography>{prizeItem}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default StagesGatWent;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1022,
    height: "100%",
    alignItems: "center",
    margin: "0 auto",
    padding: theme.spacing(3.75, 10),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3.75, 2),
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      alignItems: "start",
    },
  },
  statisticsList: {
    width: "100%",
    padding: theme.spacing(5, 0, 3.75),
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(3, 0, 0),
      flexDirection: "column",
      justifyContent: "flex-start",
    },
  },
  spaceBetweenRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  statisticsItem: {
    "&>*:nth-child(2)": {
      maxWidth: 120,
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "flex-start",
      marginBottom: theme.spacing(2.5),
    },
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  image: {
    height: 88,
    width: 80,
    marginRight: theme.spacing(2),
  },
  prizeItem: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#EDF8FE",
    padding: theme.spacing(2),
    "&>*:nth-child(1)": {
      width: 30,
      height: 27,
      marginRight: theme.spacing(1),
    },
  },
}));
