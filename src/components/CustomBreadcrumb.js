import React from "react";
import { makeStyles, Breadcrumbs, Typography } from "@material-ui/core";
import clsx from "clsx";
import AppLink from "./AppLink";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import EditionAction from "redux/edition.redux";
import { useDispatch } from "react-redux";
import { PathConstant } from "const";
const CustomBreadcrumb = ({ bookName, articleName, className, challengeName }) => {
  const { t: getLabel } = useTranslation();
  const BREADCRUMB_NAME_MAP = {
    editions: getLabel("TXT_MOST_BORROWING_BOOK"),
    edition: bookName,
    articles: getLabel("TXT_LATEST_ARTICLE"),
    article: articleName,
    challenges: getLabel("TXT_CHALLENGE_WITH_GAT"),
    challenge: challengeName,
  };
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { pathname } = router;
  const pathNames = pathname
    .split("/")
    .map(pathname => pathname.replace(/\[/, "").replace(/\]/, ""))
    .filter(pathname => BREADCRUMB_NAME_MAP[pathname]);
  const onClickLastPath = lastPath => {
    if (lastPath === "editions") {
      dispatch(EditionAction.setSuggestionsCategoryId(null));
      router.push(PathConstant.COLLECTION_BOOKS);
    }
  };
  return (
    <Breadcrumbs className={clsx(classes.root, className)} separator={">"}>
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
          <Typography
            variant="body2"
            key={index}
            className={classes.disabledLink}
            onClick={() => onClickLastPath(pathname)}
          >
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
  root: {
    marginBottom: theme.spacing(2),
  },
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
  challengeName: PropTypes.string,
  className: PropTypes.string,
};

export default CustomBreadcrumb;
