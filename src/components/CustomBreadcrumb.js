import React from "react";
import { makeStyles, Breadcrumbs, Typography } from "@material-ui/core";
import AppLink from "./AppLink";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const CustomBreadcrumb = ({ bookName, articleName }) => {
  const BREADCRUMB_NAME_MAP = {
    editions: null,
    book: bookName,
    articles: null,
    article: articleName,
  };
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  const router = useRouter();
  const { pathname } = router;
  const pathNames = pathname
    .split("/")
    .map(pathname => pathname.replace(/\[/, "").replace(/\]/, ""))
    .filter(pathname => BREADCRUMB_NAME_MAP[pathname]);
  return (
    <Breadcrumbs separator={">"}>
      {pathNames.length > 0 ? (
        <AppLink className={classes.link} to="/">
          <Typography variant="body2">{getLabel("TXT_HOMEPAGE")}</Typography>
        </AppLink>
      ) : (
        <Typography variant="body2" className={classes.disabledLink}>
          {getLabel("TXT_HOMEPAGE")}
        </Typography>
      )}
      {pathNames.map((pathname, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathNames.length - 1;
        return isLast ? (
          <Typography variant="body2" key={index} className={classes.disabledLink}>
            {BREADCRUMB_NAME_MAP[pathname]}
          </Typography>
        ) : (
          <AppLink className={classes.link} key={index} color={"textSecondary"} to={routeTo}>
            <Typography variant="body2">{BREADCRUMB_NAME_MAP[pathname]}</Typography>
          </AppLink>
        );
      })}
    </Breadcrumbs>
  );
};

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.text.secondary,
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
  disabledLink: {
    color: theme.palette.text.primary,
    userSelect: "none",
  },
}));

CustomBreadcrumb.propTypes = {
  bookName: PropTypes.string,
  articleName: PropTypes.string,
};

export default CustomBreadcrumb;
