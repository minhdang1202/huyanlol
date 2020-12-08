import React from "react";
import { LangConstant, AppConstant, PathConstant } from "const";
import { useTranslation } from "react-i18next";
import { Box, makeStyles, Typography, Paper, Avatar } from "@material-ui/core";
import PropTypes from "prop-types";
import { getImageById } from "utils";
import { convertFormat } from "utils/date";
import StringFormat from "string-format";
import { AppLink } from "components";

const ChallengeListDetailCard = ({ title, totalJoined, startDate, endDate, imageId, challengeId }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const LINK = AppConstant.WEBSITE_URL + StringFormat(PathConstant.FM_CHALLENGE_DETAIL_ID, challengeId);
  return (
    <AppLink to={LINK}>
      <Box className={classes.root}>
        <Avatar src={getImageById(imageId)} className={classes.image} variant="square" />
        <Paper className={classes.info}>
          <Typography variant="subtitle1">{title}</Typography>
          <Box className={classes.content}>
            <Box className="ic-user-alt-solid">
              <Typography variant={"body2"} component="span">
                {StringFormat(getLabel("FM_JOINED"), totalJoined)}
              </Typography>
            </Box>
            <Box className="ic-calendar-alt-solid">
              <Typography variant={"body2"} component="span">
                {StringFormat(
                  getLabel("FM_DUE_TIME"),
                  convertFormat(new Date(startDate), AppConstant.FM_DD_MM_YYYY),
                  convertFormat(new Date(endDate), AppConstant.FM_DD_MM_YYYY),
                )}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </AppLink>
  );
};
ChallengeListDetailCard.propTypes = {
  title: PropTypes.string,
  totalJoined: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  imageId: PropTypes.string,
  challengeId: PropTypes.number,
};
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    position: "relative",
    marginBottom: "-8px",
  },
  image: {
    height: "225px",
    width: "100%",
    borderRadius: "10px",
    zIndex: 2,
  },
  info: {
    width: "100%",
    position: "relative",
    marginTop: "-8px",
    padding: "16px",
    borderRadius: "0px 0px 10px 10px",
  },
  content: {
    color: theme.palette.grey[500],
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(1),
    "&>*": {
      "&>:first-child": {
        marginLeft: "4px",
      },
    },
    "&>:first-child": {
      marginRight: "20px",
    },
  },
}));
export default ChallengeListDetailCard;
