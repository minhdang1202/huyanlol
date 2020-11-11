import React from "react";
import { makeStyles, Typography, Paper, Box, Avatar } from "@material-ui/core";
import { LangConstant } from "const";
import { useTranslation } from "react-i18next";
import StringFormat from "string-format";
const ACT_DATA = {
  name: "Duongdz",
  time: "12 giờ trước",
  activity: "vừa đọc xong quyển",
  book: "Nghệ Thuật Bài Trí Của Người Nhật",
};

const Activity = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Box className={classes.root}>
      <Typography variant={"h6"} className={classes.title}>
        {getLabel("L_ACTIVITY")}
      </Typography>
      <Item data={ACT_DATA} className={classes.item} />
      <Item data={ACT_DATA} className={classes.item} />
      <Item data={ACT_DATA} className={classes.item} />
    </Box>
  );
};

const Item = ({ data }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_DETAIL);
  return (
    <Paper className={classes.item}>
      <Box className={classes.itemTop}>
        <Avatar alt="Trump" src="/images/img-avatar.jpg" />
        <Box className={classes.topText}>
          <Typography variant="subtitle2">{data.name}</Typography>
          <Typography variant="caption">{data.time}</Typography>
        </Box>
      </Box>
      <Box className={classes.content}>
        <Typography
          dangerouslySetInnerHTML={{
            __html: StringFormat(getLabel("FM_ACTIVITY"), {
              name: data.name,
              bookLink: "/",
              book: data.book,
            }),
          }}
        />

        <Avatar alt="goal" src="/images/img-goal.jpg" variant="square" className={classes.img} />
      </Box>
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },
  title: {
    fontSize: "18px",
    fontWeight: 600,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: "20px",
    },
  },
  item: {
    width: "100%",
    borderRadius: "10px",
    margin: "16px 0px 16px 0px",
    [theme.breakpoints.down("xs")]: {
      margin: "2px 0px 2px 0px",
    },
  },

  itemTop: {
    display: "flex",
  },
  avatar: {
    width: "32px",
    height: "32px",
  },
  topText: {
    marginLeft: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
  img: {
    width: "94px",
    height: "142px",
    borderRadius: "6px",
  },
  text: {
    "&>:nth-child(3)": {
      color: theme.palette.primary.main,
    },
  },
}));
export default Activity;
