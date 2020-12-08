import React, { useState, useRef, useEffect } from "react";
import { LangConstant, AppConstant, PathConstant } from "const";
import { useTranslation } from "react-i18next";
import { Box, makeStyles, Typography, useTheme, useMediaQuery, LinearProgress, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import StringFormat from "string-format";
import clsx from "clsx";
import { daysLeft } from "utils/date";
import Slider from "react-slick";
import { SliderButton, AppLink } from "components";
import { useDispatch } from "react-redux";
import ChallengeAction from "redux/challenge.redux";
const ChallengeListJoined = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { pageData, total } = useSelector(state => state.challengeRedux.listJoined);
  const listJoined = pageData;
  const [slideIndex, setSlideIndex] = useState(0);
  const [initialSlide, setInitialSlide] = useState(0);
  const sliderRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      if (slideIndex === AppConstant.DATA_SIZES.challenges - 2 && listJoined.length < total) {
        dispatch(
          ChallengeAction.requestGetChallengeListJoined({
            joinStatusFilter: AppConstant.CHALLENGE_LIST_TYPE.joined,
            pageSize: total,
          }),
        );
        setInitialSlide(AppConstant.DATA_SIZES.challenges);
      }
    };

    load();
  }, [slideIndex]);

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
    afterChange: index => setSlideIndex(index),
    arrows: false,
    initialSlide: initialSlide,
    swipe: isTablet,
  };
  const getSlidePrefix = () => {
    if (isTablet) {
      return 2;
    } else if (isMobile) {
      return 1;
    } else {
      return 3;
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant="h6">{getLabel("L_YOUR_CHALLENGE")}</Typography>
      <Slider className={classes.list} {...settings} ref={sliderRef}>
        {listJoined.map((item, index) => (
          <Item key={item.challengeId} data={item} className={sequenceBackground(index + 1)} />
        ))}
      </Slider>
      {!isMobile && (
        <Box className={classes.positionButton}>
          <SliderButton className={classes.prevBtn} disabled={slideIndex === 0} onClick={() => onClickPrev()} />
          <SliderButton
            className={classes.nextBtn}
            disabled={slideIndex >= total - getSlidePrefix()}
            isNext
            onClick={() => onClickNext()}
          />
        </Box>
      )}
    </Box>
  );
};

const Item = ({ data, className }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_CHALLENGE_LIST);
  const { title, endDate, targetTypeId, challengeProgress, challengeModeId } = data;
  const { targetNumber, progress } = challengeProgress;
  const userProgress = (progress / targetNumber) * 100;
  const isRead = Boolean(
    targetTypeId === AppConstant.CHALLENGE_TARGET_TYPE.readBook ||
      targetTypeId === AppConstant.CHALLENGE_TARGET_TYPE.readBookList,
  );
  const isPersonal = Boolean(challengeModeId === AppConstant.CHALLENGE_MODE.personal);
  const LINK = AppConstant.WEBSITE_URL + StringFormat(PathConstant.FM_CHALLENGE_DETAIL_ID, data.challengeId);
  return (
    <AppLink to={LINK}>
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
        <RoundLinearProgress variant="determinate" value={userProgress} className={classes.progressBar} />
      </Box>
    </AppLink>
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
  root: {
    [theme.breakpoints.down("xs")]: {
      paddingRight: 0,
    },
  },
  list: {
    marginTop: theme.spacing(2),
    width: "100%",
    "& a, a:visited, a:hover, a:active, a:focus": {
      color: `${theme.palette.text.primary} !important`,
      textDecoration: "none !important",
      outline: "none !important",
    },
    "&.slick-slide": {
      margin: "0 20px",
    },
  },
  itemCard: {
    padding: "24px 16px 24px 16px",
    width: "324px",
    height: "182px",

    [theme.breakpoints.down("md")]: {
      width: "348px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "250px",
    },
    marginRight: theme.spacing(3),
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
    marginBottom: "71px",
  },
}));
export default ChallengeListJoined;
