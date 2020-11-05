import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Paper,
  Avatar,
  Typography,
  Box,
  Button,
  IconButton,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import Skeleton from "@material-ui/lab/Skeleton";
import CustomRating from "components/CustomRating";
import { LangConstant } from "const";
import { BookmarkIcon } from "icons";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import LenderList from "./LenderList";
import DialogAppDownload from "../DialogAppDownload";
import { EditionTypes } from "redux/edition.redux";

const BookInfo = ({ authorName, title, rateAvg, bookCover, editionId, ...reduxProps }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);

  const [isAuth, setIsAuth] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isLenderOpen, setIsLenderOpen] = useState(false);
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const onOpenLenderList = () => {
    setIsLenderOpen(true);
  };

  const onCloseLenderList = () => {
    setIsLenderOpen(false);
  };

  const onOpenDownload = () => {
    setIsDownloadOpen(true);
  };

  const onCloseDownload = () => {
    setIsDownloadOpen(false);
  };

  useEffect(() => {
    reduxProps.onGetLendersList(editionId);
  }, []);

  return (
    <>
      <DialogAppDownload isOpen={isDownloadOpen} onClose={onCloseDownload} />
      <LenderList isOpen={isLenderOpen} onClose={onCloseLenderList} editionId={editionId} />
      {isMobile ? (
        <Box className={classes.rootMobile}>
          <Avatar variant="square" src={bookCover}>
            {authorName}
          </Avatar>
          <Box my="auto" ml={1.5}>
            <Typography variant="h5" className={clsx("eclipse-2", "mb-8")} component="h1">
              {title}
            </Typography>
            <Typography variant="h6" color="inherit" className={clsx("eclipse", "mb-12")}>
              {authorName}
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <CustomRating defaultValue={rateAvg} readOnly={true} />
              <Typography variant="h6" color="inherit">
                {rateAvg}
              </Typography>
            </Box>
            <Box display="flex" mb={1}>
              <Button size="small" variant="contained" className="light-blue-button" onClick={onOpenDownload}>
                {getLabel("TXT_EDITION_ADD_TO_LIBRARY")}
              </Button>
              <IconButton
                classes={{ root: clsx(classes.asideButton, classes.bookmark) }}
                disableRipple
                onClick={onOpenDownload}
              >
                <BookmarkIcon
                  width={16}
                  height={21}
                  stroke={isSaved ? "" : theme.palette.white}
                  color={isSaved ? theme.palette.white : "none"}
                />
              </IconButton>
            </Box>
            <Box display="flex">
              <Button size="small" variant="contained" className="dark-blue-button" onClick={onOpenLenderList}>
                {getLabel("TXT_EDITION_BORROW_BOOK")}
              </Button>
              <Button
                size="small"
                classes={{ root: classes.asideButton, disabled: classes.disabledButton, startIcon: "mr-4" }}
                disabled
                startIcon={<Avatar variant="square" className={classes.userIcon} src="/images/ic-user.png" />}
              >
                {reduxProps.totalLenders ? reduxProps.totalLenders : <Skeleton width={84}/>}
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={classes.rootDesktop}>
          <Avatar variant="square" src={bookCover}>
            {authorName}
          </Avatar>
          <Paper>
            <Typography variant="h5" component="h1">
              {title}
            </Typography>
            <Typography variant="h6">{authorName}</Typography>
            <Box display="flex" alignItems="center" mb={4}>
              <CustomRating defaultValue={rateAvg} readOnly={true} />
              <Typography variant="h6">{rateAvg}</Typography>
            </Box>
            <Button
              size={isDesktop ? "large" : "medium"}
              variant="contained"
              className="light-blue-button"
              onClick={onOpenDownload}
            >
              {getLabel("TXT_EDITION_ADD_TO_LIBRARY")}
            </Button>
            <Button
              size={isDesktop ? "large" : "medium"}
              variant="contained"
              className="dark-blue-button"
              onClick={onOpenLenderList}
            >
              {getLabel("TXT_EDITION_BORROW_BOOK")}
            </Button>
            <Button
              size={isDesktop ? "large" : "medium"}
              variant="contained"
              startIcon={<BookmarkIcon />}
              className="white-button"
              onClick={onOpenDownload}
            >
              {getLabel("TXT_EDITION_SAVE_BOOK")}
            </Button>
          </Paper>
        </Box>
      )}
    </>
  );
};

const HEIGHT_BOOK_COVER = "280px";
const WIDTH_BOOK_COVER = "180px";

const useStyles = makeStyles(theme => ({
  rootDesktop: {
    marginBottom: `calc((${HEIGHT_BOOK_COVER} / 2) * -1 + ${theme.spacing(3)}px) !important`,
    "&>*:first-child": {
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
      borderRadius: 10,
      height: HEIGHT_BOOK_COVER,
      width: WIDTH_BOOK_COVER,
      maxWidth: "80%",
    },
    "&>*:nth-child(2)": {
      position: "relative",
      textAlign: "center",
      paddingTop: theme.spacing(20),
      top: `calc(${HEIGHT_BOOK_COVER} / 2 * -1)`,
      display: "flex",
      flexFlow: "column",
      alignItems: "center",
      "& > *:nth-child(2)": {
        color: theme.palette.text.secondary,
        marginBottom: theme.spacing(2),
      },
      "& > *:first-child": {
        marginBottom: theme.spacing(1),
      },
      "& button": {
        width: "100%",
        "&:not(:last-child)": {
          marginBottom: theme.spacing(1.5),
        },
      },
    },
  },
  rootMobile: {
    marginTop: `calc(${HEIGHT_APP_BAR} * -1)`,
    color: theme.palette.white,
    background: "linear-gradient(180deg, #53B3D9 0%, #9BBEF1 100%)",
    padding: theme.spacing(9.5, 2.5, 2.5, 2.5),
    display: "flex",
    "&>*:first-child": {
      width: 134,
      height: 218,
      borderRadius: 6,
    },
    "& button": {
      flexGrow: 1,
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
  userIcon: {
    width: 14,
    height: 16,
  },
  disabledButton: {
    color: `${theme.palette.white} !important`,
  },
  asideButton: {
    padding: "0 !important",
    marginLeft: theme.spacing(1.5),
    flexGrow: "0 !important",
    width: 40,
    minWidth: 40,
  },
  bookmark: {
    "&:hover": {
      background: "none",
      "& svg": {
        fill: theme.palette.white,
      },
    },
  },
}));

BookInfo.propTypes = {
  authorName: PropTypes.string,
  title: PropTypes.string,
  rateAvg: PropTypes.number,
  bookCover: PropTypes.string,
  editionId: PropTypes.number,
};

const mapStateToProps = state => {
  return {
    totalLenders: state.editionRedux.totalLenders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLendersList: editionId => dispatch({ type: EditionTypes.REQUEST_GET_LENDERS_LIST, editionId: editionId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookInfo);
