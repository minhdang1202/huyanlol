import React, { useState } from "react";
import { Box, makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { MainScreen, MobileTabBar } from "components/home";
import { AppConstant } from "const";
const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [screenValue, setScreenValue] = useState(0);
  const onChangeScreen = (event, newValue) => {
    setScreenValue(newValue);
  };
  return (
    <Box className={classes.root}>
      {screenValue === AppConstant.HOME_SCREEN_VALUE.main && <MainScreen />}
      {isMobile && <MobileTabBar screenValue={screenValue} onChangeScreen={onChangeScreen} />}
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
