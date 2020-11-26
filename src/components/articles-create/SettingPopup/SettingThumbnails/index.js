import React, { useRef, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";
import { SliderButton } from "components";
import ThumbnailSlider from "./ThumbnailSlider";

const SettingThumbnails = ({ currentThumbnail, thumbnailList, onChangeCurrentThumbnail }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    variableWidth: true,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };
  const classes = useStyles();
  const fileUploadRef = useRef();
  const sliderRef = useRef();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const totalSlides = thumbnailList.length - 1;
  const [slideIndex, setSlideIndex] = useState(0);

  const onPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const onNextSlide = () => {
    sliderRef.current.slickNext();
  };

  const onGoToSlide = slide => {
    sliderRef.current.slickGoTo(slide);
  };

  return (
    <>
      <Box className={clsx(classes.titleWrapper, "space-between-root")} mt={{ sm: 1.5, md: 1 }} mb={1}>
        <Typography variant="subtitle1">{getLabel("TXT_ARTICLE_THUMBNAIL")}</Typography>
        <Box display="flex">
          <SliderButton disabled={slideIndex === 0} className="mr-12" onClick={onPrevSlide} />
          <SliderButton disabled={slideIndex === totalSlides} isNext onClick={onNextSlide} />
        </Box>
      </Box>
      <Box display="flex" flexGrow={1} overflow="hidden">
        <Button
          className={classes.button}
          classes={{ label: classes.labelButton }}
          onClick={() => fileUploadRef.current.click()}
        >
          <Box className="ic-plus" fontSize={24} mb="2px" />
          <Typography variant="subtitle2">{getLabel("TXT_ADD")}</Typography>
          <input type="file" ref={fileUploadRef} hidden />
        </Button>
        <ThumbnailSlider
          ref={sliderRef}
          thumbnailList={thumbnailList}
          currentThumbnail={currentThumbnail}
          onChangeCurrentThumbnail={onChangeCurrentThumbnail}
          onGoToSlide={onGoToSlide}
          settings={settings}
        />
      </Box>
    </>
  );
};

SettingThumbnails.propTypes = {
  currentThumbnail: PropTypes.object,
  thumbnailList: PropTypes.array,
  onChangeCurrentThumbnail: PropTypes.func,
};

export default SettingThumbnails;

const useStyles = makeStyles(theme => ({
  titleWrapper: {
    position: "relative",
    zIndex: 2,
  },
  button: {
    minWidth: 74,
    width: 74,
    height: 74,
    border: `1px dashed ${theme.palette.primary.main}`,
    marginRight: theme.spacing(1.25),
  },
  labelButton: {
    flexFlow: "column",
    color: theme.palette.primary.main,
  },
}));
