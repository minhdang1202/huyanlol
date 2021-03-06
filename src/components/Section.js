import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { AppLink } from "components";
import { useTranslation } from "react-i18next";
import { getCommonKey } from "const/lang.const";
import { LangConstant } from "const";
import clsx from "clsx";

const Section = props => {
  const { title, href, classes, children, needMore } = props;
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);

  const primaryTitle = title.type ? (
    title
  ) : (
    <Typography variant="h6" component="p">
      {title}
    </Typography>
  );

  return (
    <Grid container className={clsx(defaultClasses.root, classes.root)}>
      <Grid item xs={12}>
        <Box className={defaultClasses.titleRoot}>
          <Box>{primaryTitle}</Box>
          {needMore && (
            <AppLink to={href}>
              <Typography variant="subtitle2">{getLabel(getCommonKey("TXT_SEE_MORE"))}</Typography>
            </AppLink>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} className={clsx(defaultClasses.main, classes.main)}>
        {children}
      </Grid>
    </Grid>
  );
};

Section.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string,
  classes: PropTypes.object,
  needMore: PropTypes.bool,
};
Section.defaultProps = { title: "", classes: {}, needMore: true };

export default memo(Section);

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 20,
  },
  seeMore: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  titleRoot: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    paddingTop: theme.spacing(2),
  },
}));
