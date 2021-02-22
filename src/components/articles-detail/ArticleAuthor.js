import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Typography,
  Hidden,
  Avatar,
  IconButton,
  Box,
  Divider,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AppLink } from "components";
import { LangConstant } from "const";
import { FollowButton, EditArticleButton } from "../articles-detail";
import { getImageById } from "utils";
import { useSelector } from "react-redux";

const ArticleAuthor = ({ creator, date }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const userId = useSelector(state => state.userRedux?.profile?.userId);
  const { name, address, imageId } = creator;
  return (
    <Hidden lgUp>
      <Hidden smUp>
        <Divider width="100%" className={clsx("mt-16", "mb-16")} />
      </Hidden>
      <Box className={classes.root}>
        <Hidden xsDown>
          <Title />
        </Hidden>
        <Box display="flex" alignItems="center">
          <AppLink to="#">
            <IconButton className={classes.avatarButton}>
              <Avatar className={classes.avatar} src={getImageById(imageId)} />
            </IconButton>
          </AppLink>
          <Box ml={1}>
            <Hidden smUp>
              <Title />
            </Hidden>
            <AppLink to="#">
              <Typography variant="subtitle2" component="div" className="eclipse">
                {name}
              </Typography>
            </AppLink>
            <Typography variant="caption" className="eclipse">
              {isMobile ? address : date}
            </Typography>
          </Box>
          {userId === creator.userId ? <EditArticleButton /> : <FollowButton />}
        </Box>
      </Box>
    </Hidden>
  );
};

ArticleAuthor.propTypes = {
  date: PropTypes.string,
  creator: PropTypes.object,
};

const Title = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);
  return (
    <Typography className={classes.title} variant="subtitle2">
      {getLabel("TXT_ARTICLE_REVIEW_BY")}
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  avatarButton: {
    padding: "0 !important",
    minWidth: "fit-content",
    width: "fit-content",
  },
  avatar: {
    width: 53,
    height: 53,
    [theme.breakpoints.down("xs")]: {
      width: 57,
      height: 57,
    },
  },
  root: {
    width: "100%",
    "& a": {
      color: theme.palette.text.primary,
    },
    marginTop: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      marginTop: 0,
    },
    "& button:last-child": {
      marginLeft: "auto",
    },
  },
  title: {
    textTransform: "uppercase",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      marginBottom: 0,
    },
  },
}));

export default ArticleAuthor;
