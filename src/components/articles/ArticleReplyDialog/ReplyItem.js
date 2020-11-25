import React, { memo } from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { HeartIcon } from "icons";
import { useTranslation } from "react-i18next";
import { AppConstant } from "const";
import clsx from "clsx";
import PreviewBook from "./PreviewBook";

const ReplyItem = ({ data }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const onSendHear = event => {
    event.stopPropagation();
    console.log("onSendHear");
  };
  let isHeart = true;
  let isPreviewBook = true;

  return (
    <Card className={classes.root}>
      <CardHeader
        classes={{ avatar: classes.headerAvatar }}
        avatar={<Avatar aria-label="avatar">{AppConstant.APP_NAME.charAt(0)}</Avatar>}
        title={
          <Typography variant="subtitle2" component="p">
            Richard Brown
          </Typography>
        }
        subheader={
          <Typography variant="caption" color="textSecondary" component="p">
            3 giờ trước
          </Typography>
        }
      />
      <CardContent className={classes.main}>
        <Box>
          <Box flexGrow="1">
            <Typography variant="body1" component="p">
              Có lẽ list này bạn nên thêm một chút thông tin bổ sung là "Đặc biệt thích hợp cho nữ giới", bởi theo cảm
              nhận cá nhân những series trên đều có vẻ gì đó hấp dẫn và làm hài lòng nữ giới theo cách nào đó. Ngoài các
              series này ra còn các series cực kỳ đáng xem và thú vị mà mình chẳng quan tâm rating nó là bao nhiêu thì
              có.
            </Typography>
          </Box>
          <Box className={clsx(classes.mainAction, isHeart && classes.heartColor)}>
            <IconButton onClick={onSendHear}>
              <HeartIcon isActive={isHeart} width={24} height={24} />
            </IconButton>
            <Typography variant="body2" color="inherit" component="p">
              34
            </Typography>
          </Box>
        </Box>
        {isPreviewBook && <PreviewBook />}
      </CardContent>
      <Button variant="text" className={classes.replyBtn}>
        {getLabel("TXT_REPLY")}
      </Button>
    </Card>
  );
};

ReplyItem.propTypes = {
  data: PropTypes.object,
};
ReplyItem.defaultProps = { isHiddenAction: false };

export default memo(ReplyItem);

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "unset",
    overflow: "unset",

    "&, & > *": {
      padding: 0,
    },
  },
  headerAvatar: { marginRight: 12 },
  main: {
    paddingTop: theme.spacing(1),
    "& > *": {
      display: "flex",
      marginBottom: 8,
    },
  },
  mainAction: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heartColor: {
    "&, & *": {
      color: theme.palette.error.main,
    },
  },
  replyBtn: {
    color: theme.palette.grey[500],
    marginLeft: -8,
    marginBottom: 4,
  },
}));
