import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Button, Box, Hidden, Divider, useTheme, useMediaQuery, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { FBShareButton, DialogAppDownload, BookmarkButton } from "components";
import { PADDING_X_CONTAINER_MOBILE } from "pages/articles/[article]";

const ArticleReactButtons = ({ shareUrl }) => {
  const { t: getLabel } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { saved: isBookmarked } = useSelector(({ articleRedux }) => articleRedux.article);
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const onOpenDownload = () => {
    setIsOpenDownload(true);
  };
  const onCloseDownload = () => {
    setIsOpenDownload(false);
  };

  return (
    <Box className={classes.root}>
      <Divider className={classes.divider} />
      <DialogAppDownload isOpen={isOpenDownload} onClose={onCloseDownload} />
      <Box bgcolor="white" display="flex" justifyContent={{ xs: "space-around", sm: "space-between" }} py={1}>
        <Button
          size={isMobile ? "small" : "large"}
          className="grey-text"
          startIcon={<Box className="ic-heart-empty" />}
          onClick={onOpenDownload}
        >
          {getLabel("TXT_LOVE")}
        </Button>
        <Hidden smUp>
          <Button size="small" className="grey-text" startIcon={<Box className="ic-comment" />}>
            {getLabel("TXT_COMMENT")}
          </Button>
        </Hidden>
        <Hidden xsDown>
          <Box display="flex">
            <BookmarkButton size="large" isBookmarked={isBookmarked} className="mr-24" onClick={onOpenDownload}>
              {getLabel("TXT_BOOKMARK")}
            </BookmarkButton>
            <FBShareButton size="large" url={shareUrl} />
          </Box>
        </Hidden>
      </Box>
      <Divider className={classes.divider} />
    </Box>
  );
};

ArticleReactButtons.propTypes = {
  shareUrl: PropTypes.string,
};

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    bottom: 0,
    maxWidth: "calc(1020px / 12 * 8)",
    margin: "0 auto",
    [theme.breakpoints.up("md")]: {
      maxWidth: "calc(1020px / 12 * 8 - 32px)",
    },
    [theme.breakpoints.down("xs")]: {
      position: "sticky",
      width: "100%",
    },
  },
  divider: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: `calc(100% + ${PADDING_X_CONTAINER_MOBILE} * 2)`,
      marginLeft: `calc(${PADDING_X_CONTAINER_MOBILE} * -1)`,
    },
  },
}));

export default ArticleReactButtons;
