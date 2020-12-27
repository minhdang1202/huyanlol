import React, { useState } from "react";
import { Box, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { MainScreen, MobileTabBar, MobileSearchScreen } from "components/home";
import { AppConstant } from "const";
import { AuthDialog, DialogAppDownload } from "components";
import { hasLogged } from "utils/auth";
const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [screenValue, setScreenValue] = useState(0);
  const [isOpenAuthDialog, setIsOpenAuthDialog] = useState(false);
  const [isOpenDownloadDialog, setIsOpenDownloadDialog] = useState(false);
  const onChangeScreen = (event, newValue) => {
    if (newValue === AppConstant.HOME_SCREEN_VALUE.user) {
      if (hasLogged()) {
        setIsOpenDownloadDialog(true);
      } else {
        setIsOpenAuthDialog(true);
      }
    } else {
      setScreenValue(newValue);
    }
  };
  const onCloseAuthDialog = () => setIsOpenAuthDialog(false);
  const onCloseDownloadDialog = () => setIsOpenDownloadDialog(false);
  return (
    <Box className={classes.root}>
      {screenValue === AppConstant.HOME_SCREEN_VALUE.main && <MainScreen />}
      {screenValue === AppConstant.HOME_SCREEN_VALUE.search && <MobileSearchScreen onChangeScreen={onChangeScreen} />}
      {isMobile && <MobileTabBar screenValue={screenValue} onChangeScreen={onChangeScreen} />}
      <AuthDialog isOpen={isOpenAuthDialog} onClose={onCloseAuthDialog} />
      <DialogAppDownload isOpen={isOpenDownloadDialog} onClose={onCloseDownloadDialog} />
    </Box>
  );
};

export default Home;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    overflow: "auto",
  },
}));
