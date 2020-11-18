import React, { useState } from "react";
import { makeStyles, Container, Divider, Typography, Box, TextareaAutosize } from "@material-ui/core";
import PropTypes from "prop-types";
import clsx from "clsx";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import MainLayout from "layouts/MainLayout";
import { CustomRating } from "components";
import { CreateToolbar, CustomEditor } from "components/create";

const Creator = () => {
  const isReviewType = true;
  const MAX_LENGTH_TITLE = 250;
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CREATE);
  const [title, setTitle] = useState();
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState();
  const [hasContent, setHasContent] = useState();

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

  return (
    <MainLayout className={classes.root}>
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
            placeholder={getLabel("P_CREATE_TITLE")}
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
    [theme.breakpoints.down("sm")]: {
      maxWidth: 624,
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
