import React from "react";
import { makeStyles, Container, Typography, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import LogoBox from "../LogoBox";
import { LangConstant } from "const";
import DownloadButtons from "../DownloadButtons";

const AppDownload = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  return (
    <Box className={classes.root}>
      <LogoBox width={parseInt(HEIGHT_LOGO_BOX)} />
      <Container>
        <Typography variant="h6">{getLabel("TXT_BOOKDETAIL_GAT_APP")}</Typography>
        <Typography variant="body2">{getLabel("TXT_BOOKDETAIL_APP_DOWNLOAD")}</Typography>
        <DownloadButtons className={classes.downloadButtons} />
      </Container>
    </Box>
  );
};

const HEIGHT_LOGO_BOX = "96px";

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: `calc((${HEIGHT_LOGO_BOX} / 2) * -1 + ${theme.spacing(3)}px) !important`,
    "&>*:first-child": {
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    "&>*:nth-child(2)": {
      position: "relative",
      background: "rgba(226, 239, 246, 0.5)",
      border: `2px dashed ${theme.palette.primary.main}`,
      borderRadius: 10,
      maxWidth: "100%",
      textAlign: "center",
      padding: theme.spacing(7, 2, 3, 2),
      top: `calc(${HEIGHT_LOGO_BOX} / 2 * -1)`,
      "& p:nth-child(2)": {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(2),
        color: theme.palette.text.secondary,
      },
    },
  },
  downloadButtons: {
    padding: theme.spacing(0, 2.5),
  },
}));

export default AppDownload;
