import React from "react";
import { makeStyles, Typography, Box, Avatar, Grid, Hidden } from "@material-ui/core";
import { LangConstant, AppConstant, PathConstant } from "const";
import { useTranslation } from "react-i18next";
import { AppLink } from "components";

const Footer = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ABOUT_US);
  const NAVIGATION_LIST = [
    { title: getLabel("TXT_INTRODUCE_ABOUT_GAT"), linkTo: PathConstant.ABOUT_US },
    { title: getLabel("TXT_REGISTER_BOOKSTOP"), linkTo: "#" },
    { title: getLabel("TXT_TERMS"), linkTo: PathConstant.TERM_AND_POLICY },
    { title: getLabel("TXT_FAQ"), linkTo: PathConstant.FAQ },
    { title: getLabel("TXT_PRIVACY"), linkTo: PathConstant.TERM_AND_POLICY },
    { title: getLabel("TXT_GAT_APP"), linkTo: AppConstant.GAT_BOTH_DOWNLOAD },
    { title: getLabel("TXT_CONTACT"), linkTo: "#" },
  ];
  const SOCIAL_LIST = [
    { imgUrl: "/images/ic-facebook.png", linkTo: AppConstant.GAT_FACEBOOK_PAGE_URL },
    { imgUrl: "/images/ic-instagram.png", linkTo: AppConstant.GAT_INSTAGRAM_PAGE_URL },
    { imgUrl: "/images/ic-twitter.png", linkTo: "#" },
  ];

  return (
    <Box className={classes.root}>
      <Grid container className={classes.gridRoot} justify="space-between">
        <Grid item xs={12} sm={3}>
          <Avatar variant="square" src="/images/logo-blue.png" className={classes.logo} />
          <Typography gutterBottom>{getLabel("TXT_GIVE_AND_TAKE_BOOK")}</Typography>
          <Typography variant="body2" className={classes.lightColorText}>
            {getLabel("TXT_GIVE_AND_TAKE_BOOK_BODY")}
          </Typography>
          <Box mt={3} className={classes.socialIconList}>
            {SOCIAL_LIST.map(({ imgUrl, linkTo }, index) => (
              <AppLink key={`social-icon-${index}`} target="_blank" to={linkTo} className="no-style-link">
                <Avatar variant="square" src={imgUrl} className={classes.logoIcon} />
              </AppLink>
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} sm={5} className={classes.navList}>
          {NAVIGATION_LIST.map(({ title, linkTo }, index) => (
            <AppLink key={`footerNav-${index}`} target="_blank" to={linkTo} className="no-style-link">
              <Box className={classes.navItem}>
                <Typography>{title}</Typography>
              </Box>
            </AppLink>
          ))} 
        </Grid>

        <Grid item xs={12} sm={3} className={classes.iframeBox}>
          <iframe
            src={AppConstant.GAT_FACEBOOK_PAGE_PLUGIN}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            className={classes.iframe}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          ></iframe>
        </Grid>

        <Hidden xsDown>
          <Box className={classes.copyrightTxt}>
            <Typography>2017 © GATApp Inc. All right reserved</Typography>
          </Box>
        </Hidden>
      </Grid>
    </Box>
  );
};

export default Footer;

const useStyles = makeStyles(theme => ({
  root: {
    borderTop: "2px solid #E7ECF1",
    padding: theme.spacing(3.75, 2, 1),
    position: "relative"
  },
  gridRoot: {
    maxWidth: 1022,
    margin: "16px auto",
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: 0,
    },
  },
  lightColorText: {
    color: "#4A4A4A",
  },
  logo: {
    width: 67,
    height: 34,
    marginBottom: theme.spacing(1.75),
  },
  socialIconList: {
    display: "flex",
    "&>*": {
      marginRight: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      marginBottom: theme.spacing(5),
    },
  },
  navItem: {
    height: 40,
  },
  navList: {
    display: "grid",
    gridTemplateColumns: "auto auto",
    maxHeight: 153,
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(0, 2.5, 2),
    },
  },
  iframeBox: {
    display: "flex",
    justifyContent: "center",
  },
  iframe: {
    border: "none",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    [theme.breakpoints.down("xs")]: {
      width: 340
    }
  },
  copyrightTxt: {
    position: "absolute",
    bottom: 24,
    left: "50%",
    transform: "translateX(-50%)"
  }
}));
