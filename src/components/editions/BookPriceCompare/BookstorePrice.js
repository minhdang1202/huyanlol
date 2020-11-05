import React from "react";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme, Typography, Box, Button, Hidden } from "@material-ui/core";
import { LogoBox, AppLink } from "components";
import { CartIcon } from "icons";

const BookstorePrice = ({ logo, link, freeship, retailPrice, salePrice, isInOfStock }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  return (
    <Button
      classes={{ root: classes.button, startIcon: classes.startIcon }}
      startIcon={<LogoBox width="100%" imgSrc={logo} className={classes.logoBox} />}
    >
      <AppLink as={link}>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="flex-end" mb={1}>
              <Typography variant="h6" className={classes.retailPrice}>
                {retailPrice}
              </Typography>
              <Typography variant="caption" className={classes.salePrice}>
                {salePrice}
              </Typography>
            </Box>
            <Typography variant="caption">{freeship}</Typography>
          </Box>
          <Hidden smUp>
            <Box ml={2} display="flex" flexDirection="column" alignItems="center">
              <CartIcon color={isInOfStock ? theme.palette.primary.main : theme.palette.text.secondary} />
              <Typography className={clsx("mt-4", isInOfStock ? "blue-text" : "")} variant="caption">
                {isInOfStock ? getLabel("TXT_EDITION_IN_OF_STOCK") : getLabel("TXT_EDITION_OUT_OF_STOCK")}
              </Typography>
            </Box>
          </Hidden>
        </Box>
      </AppLink>
    </Button>
  );
};

const useStyles = makeStyles(theme => ({
  retailPrice: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(0.5),
    lineHeight: 0.9,
  },
  salePrice: {
    textDecoration: "line-through",
    lineHeight: "normal",
  },
  button: {
    padding: "0 !important",
    textAlign: "left",
    lineHeight: "normal !important",
    "& a:hover": {
      textDecoration: "none",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      justifyContent: "flex-start",
      paddingRight: "8px !important",
      "& a": {
        width: "100%",
      },
    },
  },
  startIcon: {
    width: "50%",
    maxWidth: 71,
    maxHeight: 71,
    marginRight: theme.spacing(1.5),
    [theme.breakpoints.down("xs")]: {
      maxWidth: 74,
      maxHeight: 74,
    },
  },
  logoBox: {
    minWidth: 50,
    minHeight: 50,
  },
}));

BookstorePrice.propTypes = {
  logo: PropTypes.string,
  link: PropTypes.string,
  freeship: PropTypes.string,
  retailPrice: PropTypes.string,
  salePrice: PropTypes.string,
  isInOfStock: PropTypes.bool,
};

export default BookstorePrice;
