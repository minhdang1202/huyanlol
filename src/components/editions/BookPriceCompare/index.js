import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { makeStyles, Paper, Typography, Hidden } from "@material-ui/core";
import BookstorePrice from "./BookstorePrice";

const BookPriceCompare = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  return (
    <Paper className={classes.root}>
      <Hidden xsDown>
        <Typography variant="h6">{getLabel("TXT_BOOKDETAIL_BOOK_PRICE_COMPARE")}</Typography>
      </Hidden>
      <div>
        {BOOKSTORE_LOGOS.map((logo, index) => {
          return <BookstorePrice key={index} {...PRICE_DEMO[index]} logo={BOOKSTORE_LOGOS[index]} />;
        })}
      </div>
    </Paper>
  );
};

const PRICE_DEMO = Array(4).fill({
  retailPrice: "59.000",
  salePrice: "39.000",
  freeship: "Freeship cho đơn hàng từ 99.000",
  link: "https://tiki.vn",
  isInOfStock: false,
});

const BOOKSTORE_LOGOS = [
  "/images/logo-shopee.png",
  "/images/logo-tiki.png",
  "/images/logo-vinabook.png",
  "/images/logo-fahasa.png",
];

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "&>*:first-child": {
      marginBottom: theme.spacing(2),
    },
    "&>*:nth-child(2)": {
      "&>*:not(:last-child)": {
        marginBottom: theme.spacing(2),
      },
    },
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0 !important",
      padding: theme.spacing(2, 2.5),
      "&>*": {
        "&>*:not(:last-child)": {
          marginBottom: theme.spacing(2),
        },
      },
    },
  },
}));

export default BookPriceCompare;
