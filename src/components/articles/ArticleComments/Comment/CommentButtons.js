import React, { useState } from "react";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Button, Box, useTheme, makeStyles, useMediaQuery } from "@material-ui/core";
import DialogAppDownload from "components/DialogAppDownload";

const CommentButtons = ({ reactCount, commentCount }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation();

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
      {isMobile ? (
        <Button size="small" className={clsx(classes.buttonMobile, "grey-text")}>
          {getLabel("TXT_REPLY")}
        </Button>
      ) : (
        <Box display="flex">
          <Button
            className={clsx("grey-text", "mr-16")}
            startIcon={<Box className="ic-heart-empty" />}
            onClick={onOpenDownload}
          >
            {StringFormat(getLabel("FM_LOVE"), reactCount)}
          </Button>
          <Button className="grey-text" startIcon={<Box className="ic-comment" />}>
            {StringFormat(getLabel("FM_COMMENT"), commentCount)}
          </Button>
        </Box>
      )}
    </>
  );
};

CommentButtons.propTypes = {
  reactCount: PropTypes.number,
  commentCount: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  buttonMobile: {
    margin: theme.spacing(-1, 0, 0, -1),
  },
}));

export default CommentButtons;
