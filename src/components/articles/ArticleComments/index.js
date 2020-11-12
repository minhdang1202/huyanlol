import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import { Typography, Box, Hidden, Button, Divider, makeStyles, Avatar } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import MobileInput from "./MobileInput";
import SortPopup from "./SortPopup";
import Comment from "./Comment";

const ArticleComments = ({ commentList }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  const { getCommonKey } = LangConstant;
  const RADIO_LIST = [
    {
      value: 0,
      label: getLabel(getCommonKey("TXT_POPULAR_COMMENT_RANGE")),
      displayLabel: getLabel(getCommonKey("TXT_POPULAR_COMMENT")),
    },
    {
      value: 1,
      label: getLabel(getCommonKey("TXT_FRIEND_COMMENT_RANGE")),
      displayLabel: getLabel(getCommonKey("TXT_FRIEND_COMMENT")),
    },
  ];
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [sortValue, setSortValue] = useState(RADIO_LIST[0].value);
  const [displaySort, setDisplaySort] = useState(RADIO_LIST[sortValue].displayLabel);
  const onOpenSort = () => {
    setIsOpenSort(true);
  };
  const onCloseSort = () => {
    setIsOpenSort(false);
  };
  const onChangeSort = value => {
    setSortValue(value);
    setDisplaySort(RADIO_LIST[value].displayLabel);
  };
  return (
    <Box width="100%">
      <SortPopup
        sortValue={sortValue}
        radioList={RADIO_LIST}
        open={isOpenSort}
        onClose={onCloseSort}
        onChangeSort={onChangeSort}
      />
      <Hidden smUp>
        <Box display="flex" justifyContent="space-between" alignItems="center" width="100%" mt={2}>
          <Typography variant="h5">{getLabel(getCommonKey("TXT_COMMENT"))}</Typography>
          <Button endIcon={<Box className="ic-chevron-down" />} className={classes.selectButton} onClick={onOpenSort}>
            <Typography variant="body2">{displaySort}</Typography>
          </Button>
        </Box>
      </Hidden>
      <Box position="relative">
        {commentList.length === 0 ? (
          <Box py={{ xs: 10, sm: 8 }} className="center-root" flexDirection="column">
            <Box className="ic-comment-alt-dots" />
            <Typography variant="body2" className="grey-text">
              {getLabel("TXT_ARTICLE_FIRST_COMMENT")}
            </Typography>
          </Box>
        ) : (
          <Box mb={{ xs: 4, sm: 5 }} mt={3} className={classes.commentWrapper}>
            <Hidden xsDown>
              <Button
                variant="outlined"
                className={clsx("grey-text", classes.commentButton)}
                startIcon={<Avatar className={classes.userAvatar} src="" />}
              >
                <Typography variant="subtitle1">{getLabel("TXT_ARTICLE_WRITE_COMMENT")}</Typography>
              </Button>
            </Hidden>
            {commentList.slice(0, 2).map((comment, index) => {
              const { replyList } = comment;
              const hasReply = Boolean(replyList.length);
              return (
                <Box key={index}>
                  <Comment comment={comment} />
                  <Hidden smUp>
                    <Box display="flex" mt={1}>
                      <Divider orientation="vertical" className="mr-12" flexItem />
                      <Box>
                        {hasReply &&
                          replyList.map((reply, index) => (
                            <Comment
                              key={index}
                              comment={reply}
                              className={index === replyList.length - 1 ? null : "mb-8"}
                            />
                          ))}
                      </Box>
                    </Box>
                  </Hidden>
                </Box>
              );
            })}
            <Hidden xsDown>
              <Button variant="contained" className={clsx("light-blue-button", classes.seeAllButton)}>
                {StringFormat(getLabel("FM_ARTICLE_SEE_ALL_COMMENTS"), commentList.length)}
              </Button>
            </Hidden>
          </Box>
        )}
        <Hidden smUp>
          <MobileInput />
        </Hidden>
      </Box>
    </Box>
  );
};

ArticleComments.propTypes = {
  commentList: PropTypes.array,
};

const useStyles = makeStyles(theme => ({
  selectButton: {
    "& .ic-chevron-down": {
      fontSize: 14,
    },
  },
  seeAllButton: {
    width: "100%",
  },
  commentWrapper: {
    "&>*:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  commentButton: {
    borderRadius: "6px !important",
    width: "100%",
    justifyContent: "flex-start",
    padding: theme.spacing(2),
    borderColor: `${theme.palette.grey[100]} !important`,
  },
  userAvatar: {
    width: 48,
    height: 48,
    marginRight: theme.spacing(1),
  },
}));

export default ArticleComments;
