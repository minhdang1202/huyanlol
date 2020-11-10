import React, { memo } from "react";
import {
  makeStyles,
  useTheme,
  useMediaQuery,
  AppBar,
  Toolbar,
  Avatar,
  Container,
  Hidden,
  Typography,
  IconButton,
  Box,
} from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import AppLink from "components/AppLink";
import { PathConstant } from "const";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";
import { FacebookShareButton } from "react-share";

const CustomAppBar = ({ isDetail, className, appBarTitle, shareUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles({ isDetail: isDetail });

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          {isDetail && isMobile ? (
            <>
              <Box display="flex" alignItems="center">
                <IconButton className={classes.iconButton}>
                  <Box className="ic-chevron-left" />
                </IconButton>
                {appBarTitle && (
                  <Typography variant="h5" className="eclipse">
                    {appBarTitle}
                  </Typography>
                )}
              </Box>
              {shareUrl && (
                <FacebookShareButton resetButtonStyle={false} url={shareUrl} className={classes.shareButton}>
                  <IconButton component="div" className={classes.iconButton}>
                    <Box className="ic-share" />
                  </IconButton>
                </FacebookShareButton>
              )}
            </>
          ) : (
            <>
              <AppLink to={PathConstant.ROOT}>
                <Avatar variant="square" src="/images/logo.png" alt="logo" className={classes.logo} />
              </AppLink>
              <Container className={classes.searchBar}>
                <SearchBar />
              </Container>
              <Hidden xsDown>
                <SignIn />
              </Hidden>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

CustomAppBar.propTypes = {
  isDetail: PropTypes.bool,
  className: PropTypes.string,
  appBarTitle: PropTypes.string,
  shareUrl: PropTypes.string,
};
CustomAppBar.defaultProps = {};

export const HEIGHT_APP_BAR = "72px";

const useStyles = makeStyles(theme => ({
  root: {
    position: "sticky",
    background: theme.palette.white,
    color: "inherit",
    fontSize: 18,
    boxShadow: `0px 1px 0px ${theme.palette.grey[100]}`,
  },
  toolbar: {
    height: HEIGHT_APP_BAR,
    minHeight: HEIGHT_APP_BAR,
    padding: theme.spacing(1.5, 0),
    justifyContent: props => (props.isDetail ? "space-between" : ""),
  },
  logo: {
    width: 64,
    height: "auto",
    maxHeight: HEIGHT_APP_BAR,
  },
  searchBar: {
    maxWidth: 612,
    height: "100%",
  },
  iconButton: {
    width: 35,
    height: 35,
    "& *": {
      fontSize: 18,
    },
    "&:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
  shareButton: {
    width: "fit-content",
    height: "fit-content",
    border: "none",
    background: "none",
  },
}));

export default memo(CustomAppBar);
