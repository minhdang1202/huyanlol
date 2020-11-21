import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import StringFormat from "string-format";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles, Container, Divider, Typography, Box, TextareaAutosize, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { LangConstant, PathConstant } from "const";
import { useTranslation } from "react-i18next";
import MainLayout from "layouts/MainLayout";
import { CustomRating, DialogAppDownload } from "components";
import { CreateToolbar, CustomEditor } from "components/create";
import ArticleCreateActions from "redux/articleCreate.redux";

const Creator = () => {
  const MAX_LENGTH_TITLE = 250;
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);

  const dispatch = useDispatch();
  const dispatchStartSuccess = () => dispatch(ArticleCreateActions.startReviewBookSuccess());
  const [hasStartReviewBook, info] = useSelector(state => [
    state.articleCreateRedux.hasStartReviewBook,
    state.articleCreateRedux.reviewInfo,
  ]);

  const [title, setTitle] = useState();
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState();
  const [hasContent, setHasContent] = useState();
  const [isReviewType, setIsReviewType] = useState();
  const [reviewInfo, setReviewInfo] = useState();

  const onCloseDownload = () => {
    if (isReviewType) {
      router.push(StringFormat(PathConstant.FM_BOOK_DETAIL_ID, reviewInfo.editionId));
    } else {
      router.push(PathConstant.ROOT);
    }
  };

  const onChangeContent = (contentHtml, hasContent) => {
    setContent(contentHtml);
    setHasContent(hasContent);
  };

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeRate = (e, newRate) => {
    setRate(newRate);
  };

  useEffect(() => {
    setIsReviewType(hasStartReviewBook);
    setReviewInfo(info);
    dispatchStartSuccess();
  }, []);

  useEffect(() => {
    if (reviewInfo) {
      setRate(reviewInfo.rate);
    }
  }, [reviewInfo]);

  return (
    <MainLayout className={classes.root}>
      <Hidden smUp>
        <DialogAppDownload isOpen={true} onClose={onCloseDownload} />
      </Hidden>
      <Box position="relative">
        <Box position="sticky" top={0}>
          <Container className={classes.container}>
            <CreateToolbar isDisabled={!(hasContent && title)} />
          </Container>
          <Divider />
        </Box>
        <Container className={classes.container}>
          <TextareaAutosize
            maxLength={MAX_LENGTH_TITLE}
            value={title}
            className={classes.title}
            placeholder={
              isReviewType
                ? StringFormat(getLabel("FM_CREATE_REVIEW_TITLE"), reviewInfo.bookName)
                : getLabel("P_CREATE_TITLE")
            }
            onChange={onChangeTitle}
          />
          {isReviewType && (
            <Box display="flex" alignItems="center" mb={3}>
              <Typography className={clsx("grey-text", "mr-8")}>{getLabel("L_CREATE_RATING")}</Typography>
              <CustomRating value={rate} onChange={onChangeRate} />
            </Box>
          )}
          <CustomEditor onChangeContent={onChangeContent} />
        </Container>
      </Box>
    </MainLayout>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.white,
  },
  container: {
    maxWidth: 1020,
    [theme.breakpoints.down("md")]: {
      maxWidth: 670,
    },
    "&:nth-child(2)": {
      marginTop: theme.spacing(3),
    },
  },
  title: {
    resize: "none",
    width: "100%",
    fontFamily: "SFProDisplay",
    fontSize: 34,
    color: theme.palette.text.primary,
    padding: theme.spacing(1.5, 0),
    border: "none",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: theme.palette.text.secondary,
    },
  },
}));

export default Creator;
