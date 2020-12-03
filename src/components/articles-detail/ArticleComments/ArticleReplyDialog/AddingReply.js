import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  InputBase,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant } from "const";

const AddingReply = ({ data }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_DETAIL);

  const onAddReply = event => {
    event.stopPropagation();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ avatar: classes.headerAvatar }}
        avatar={<Avatar aria-label="avatar">{AppConstant.APP_NAME.charAt(0)}</Avatar>}
        title={
          <Typography variant="subtitle2" component="p" className={classes.headerTitle}>
            Richard Brown
          </Typography>
        }
      />
      <CardContent className={classes.main}>
        <InputBase fullWidth multiline rows={5} placeholder={getLabel("P_ARTICLE_WRITE_COMMENT")} />
        <Divider />
      </CardContent>
      <Button variant="contained" color="primary" className={classes.sendBtn} onClick={onAddReply}>
        {getLabel("TXT_ARTICLE_SEND_COMMENT")}
      </Button>
    </Card>
  );
};

AddingReply.propTypes = {
  data: PropTypes.object,
};
AddingReply.defaultProps = { isHiddenAction: false };

export default memo(AddingReply);

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "unset",
    "&, & > *": {
      padding: 0,
    },
  },
  headerAvatar: { marginRight: 12 },
  headerTitle: { fontSize: 18 },
  main: {
    paddingTop: theme.spacing(1),
    "& > *": {
      display: "flex",
      marginBottom: 8,
    },
  },
  sendBtn: {
    width: 132,
    minHeight: 33,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));
