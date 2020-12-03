import React, { useState, useRef } from "react";
import { LangConstant, AppConstant } from "const";
import { useTranslation } from "react-i18next";
import { Box, makeStyles, Typography, useTheme, useMediaQuery, LinearProgress, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { daysLeft } from "utils/date";
import Slider from "react-slick";
import { SliderButton } from "components";
const ChallengeListJoined = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const listJoined = useSelector(state => state.challengeRedux.listJoined);
  const [slideIndex, setSlideIndex] = useState(0);
  const sliderRef = useRef();
  const sequenceBackground = position => {
    switch (position % 4) {
      case 1:
        return classes.firstItem;
      case 2:
        return classes.secondItem;
      case 3:
        return classes.thirdItem;
      default:
        return classes.fourthItem;
    }
  };

  const onClickNext = () => sliderRef.current.slickNext();
  const onClickPrev = () => sliderRef.current.slickPrev();

  const settings = {
    dots: false,
    infinite: false,
    speed: 200,
    variableWidth: true,
    swipeToSlide: isMobile,
    afterChange: index => setSlideIndex(index),
  };
  return (
    <Box className={classes.root}>
      <Typography variant="h6">{getLabel("L_YOUR_CHALLENGE")}</Typography>
      <Slider className={classes.list} {...settings} ref={sliderRef}>
        {listJoined.map((item, index) => (
          <Item key={item.challengeId} data={item} className={sequenceBackground(index + 1)} />
        ))}
      </Slider>
      <Box className={classes.positionButton}>
        <SliderButton className={classes.prevBtn} disabled={slideIndex === 0} onClick={() => onClickPrev()} />
        <SliderButton
          className={classes.nextBtn}
          disabled={slideIndex === listJoined.length - 1}
          isNext
          onClick={() => onClickNext()}
        />
      </Box>
    </Box>
  );
};

const Item = ({ data, className }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const { title, endDate, targetTypeId, challengeProgress, challengeModeId } = data;
  const { targetNumber, progress } = challengeProgress;
  const userProgress = (progress / targetNumber) * 100;
  const isRead = Boolean(
    targetTypeId === AppConstant.CHALLENGE_TARGET_TYPE.readBook ||
      targetTypeId === AppConstant.CHALLENGE_TARGET_TYPE.readBookList,
  );
  const isPersonal = Boolean(challengeModeId === AppConstant.CHALLENGE_MODE.personal);
  return (
    <Box className={clsx(classes.itemCard, className)}>
      <Typography variant="subtitle1" className="eclipse">
        {title}
      </Typography>
      <Box className={clsx("ic-trophy-alt", classes.icLine)}>
        <Typography variant="subtitle2" component="span">
          {isPersonal ? getLabel("L_PERSONAL") : getLabel("L_GROUP")}
          <Typography variant="body2" component="span">
            {StringFormat(getLabel(isRead ? "FM_TARGET_READ" : "FM_TARGET_WRITE"), targetNumber)}
          </Typography>
        </Typography>
      </Box>
      <Box className={clsx("ic-bullseye-arrow", classes.icLine2)}>
        <Typography variant="body2" component="span">
          {StringFormat(getLabel(isRead ? "FM_PROGRESS_READ" : "FM_PROGRESS_WRITE"), progress)}
        </Typography>
      </Box>
      <Box className={classes.progressText}>
        <Typography variant="body2">{StringFormat(getLabel("FM_DAYS_LEFT"), daysLeft(endDate))}</Typography>
        <Typography variant="body2">
          {StringFormat(getLabel("FM_PROGRESS_PERCENT"), Math.round(userProgress))}
        </Typography>
      </Box>
      <RoundLinearProgress variant="determinate" value={50} className={classes.progressBar} />
    </Box>
  );
};

const RoundLinearProgress = withStyles(theme => ({
  root: {
    height: "7px",
    borderRadius: 10,
    background: theme.palette.white,
  },
  bar: {
    borderRadius: 10,
    background: "linear-gradient(90deg, #a5a1df 50%, #4cb2da 100%)",
  },
}))(LinearProgress);

Item.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
};

const useStyles = makeStyles(theme => ({
  list: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-start",
    overflowX: "scroll",
    "& .slick-slide >div>div": {},
  },
  itemCard: {
    minWidth: "324px",
    minHeight: "182px",
    marginRight: theme.spacing(3),
    padding: "24px 16px 24px 16px",
    [theme.breakpoints.down("xs")]: {
      minWidth: "250px",
      minHeight: "151px",
    },

    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "10px",
  },
  icLine: {
    "&>:first-child": {
      marginLeft: "4px",
    },
    marginTop: theme.spacing(1),
  },
  icLine2: {
    "&>:first-child": {
      marginLeft: "6px",
    },
    marginTop: theme.spacing(1),
  },
  progressText: {
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.grey[500],
    marginTop: theme.spacing(2),
  },
  progressBar: {
    marginTop: "10px",
  },
  firstItem: {
    backgroundImage: `url("images/joined-challenge1-bg.png")`,
  },
  secondItem: {
    backgroundImage: `url("images/joined-challenge2-bg.png")`,
  },
  thirdItem: {
    backgroundImage: `url("images/joined-challenge3-bg.png")`,
  },
  fourthItem: {
    backgroundImage: `url("images/joined-challenge4-bg.png")`,
  },
  prevBtn: { marginLeft: "-20.5px" },
  nextBtn: { marginRight: "-20.5px" },
  positionButton: {
    width: "100%",
    position: "relative",
    marginTop: "-111px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
export default ChallengeListJoined;
