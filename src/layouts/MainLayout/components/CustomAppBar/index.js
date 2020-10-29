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
import { ShareIcon, ArrowDownIcon } from "icons";
import AuthPopup from "../../../../components/AuthPopup";
const CustomAppBar = ({ isDetail, className, appBarTitle }) => {
  const classes = useStyles({ isDetail: isDetail });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0}>
      <Container maxWidth="lg">
        <Toolbar className={classes.toolbar}>
          {isDetail && isMobile ? (
            <>
              <Box display="flex" alignItems="center">
                <IconButton classes={{ root: classes.iconButton, label: classes.icon }}>
                  <ArrowDownIcon color="#001A39" className={classes.arrowIcon} />
                </IconButton>
                {appBarTitle && <Typography variant="h5">{appBarTitle}</Typography>}
              </Box>
              <IconButton>
                <ShareIcon />
              </IconButton>
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

CustomAppBar.propTypes = { isDetail: PropTypes.bool, className: PropTypes.string, appBarTitle: PropTypes.string };
CustomAppBar.defaultProps = {};

export const HEIGHT_APP_BAR = "72px";

const useStyles = makeStyles(theme => ({
  root: {
    position: "sticky",
    background: theme.palette.white,
    boxShadow: props => (props.isDetail ? `0px 1px 0px ${theme.palette.text.disabled}` : "none"),
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
  icon: {
    minHeight: 14,
  },
  iconButton: {
    marginRight: theme.spacing(1),
  },
  arrowIcon: {
    transform: "rotate(90deg)",
  },
}));

export default memo(CustomAppBar);
