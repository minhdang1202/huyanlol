import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Button, Box, Hidden, useTheme, useMediaQuery } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import FBShareButton from "components/FBShareButton";
import DialogAppDownload from "components/DialogAppDownload";

const ArticleReactButtons = ({ shareUrl }) => {
  const { t: getLabel } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [isOpenDownload, setIsOpenDownload] = useState(false);
  const onOpenDownload = () => {
    setIsOpenDownload(true);
  };
  const onCloseDownload = () => {
    setIsOpenDownload(false);
  };

  return (
    <>
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
            <Button
              size="large"
              className={clsx("grey-text", "mr-24")}
              startIcon={<Box className="ic-bookmark-empty" />}
              onClick={onOpenDownload}
            >
              {getLabel("TXT_BOOKMARK")}
            </Button>
            <FBShareButton size="large" shareUrl={shareUrl} />
          </Box>
        </Hidden>
      </Box>
    </>
  );
};

ArticleReactButtons.propTypes = {
  shareUrl: PropTypes.string,
};

export default ArticleReactButtons;
