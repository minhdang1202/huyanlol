import React from "react";
import StringFormat from "string-format";
import { useSelector, shallowEqual } from "react-redux";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Box, makeStyles, IconButton, Typography, useTheme, useMediaQuery } from "@material-ui/core";

const ReplyInfo = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);

  const [isTypingReply, userName] = useSelector(
    ({ articleRedux }) => [articleRedux.isTypingReply, articleRedux.replyInfo?.user?.name],
    shallowEqual,
  );

  return (
    isTypingReply &&
    isMobile && (
      <Box className={classes.root}>
        <Typography variant="subtitle1" className="eclipse">
          {StringFormat(getLabel("FM_ARTICLE_REPLY_COMMENT"), userName)}
        </Typography>
        <IconButton onClick={() => {}}>
          <Box className="ic-times-circle" />
        </IconButton>
      </Box>
    )
  );
};

export default ReplyInfo;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: theme.palette.grey[100],
    padding: theme.spacing(1, 2),
    color: theme.palette.grey[500],
    "& .ic-times-circle": {
      fontSize: 14,
      color: theme.palette.grey[500],
    },
  },
}));
