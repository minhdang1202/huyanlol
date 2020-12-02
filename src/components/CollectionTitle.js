import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Breadcrumbs, Box, Hidden, IconButton } from "@material-ui/core";
import { PathConstant } from "const";
import { useTranslation } from "react-i18next";
import { AppLink } from "components";
import { useRouter } from "next/router";

function CollectionTitle({ title }) {
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation();

  return (
    <Box className={classes.root}>
      <Hidden xsDown>
        <Breadcrumbs separator={">"}>
          <AppLink className={classes.link} to={PathConstant.ROOT}>
            <Typography variant="body2">{getLabel("TXT_HOMEPAGE")}</Typography>
          </AppLink>
          <Typography variant="body2" color="textPrimary">
            {title}
          </Typography>
        </Breadcrumbs>
        <Typography variant="h4" component="h1" className={classes.title}>
          {title}
        </Typography>
      </Hidden>
      <Hidden smUp>
        <IconButton className={classes.backBtn} onClick={() => router.push(PathConstant.ROOT)}>
          <Box className="ic-chevron-left" />
        </IconButton>
        <Typography variant="h4" component="h1" className={classes.title}>
          {title}
        </Typography>
      </Hidden>
    </Box>
  );
}

CollectionTitle.propTypes = { title: PropTypes.string.isRequired };

export default CollectionTitle;

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      alignItems: "center",
      "&>*:last-child": {
        flexGrow: 1,
      },
    },
  },
  link: {
    color: theme.palette.text.secondary,
    "&:hover": {
      textDecoration: "none",
      color: theme.palette.primary.main,
    },
  },
  title: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      fontSize: 18,
    },
  },
  backBtn: {
    width: 40,
    height: 40,
    color: theme.palette.text.primary,
    fontSize: 18,
  },
}));
