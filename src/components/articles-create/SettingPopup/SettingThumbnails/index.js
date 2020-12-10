import React, { useRef, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { Box, Typography, makeStyles } from "@material-ui/core";
import { SliderButton } from "components";
import ThumbnailSlider from "./ThumbnailSlider";
import UploadButton from "./UploadButton";

const SettingThumbnails = ({ thumbnailId, thumbnailList, onChangeThumbnailId, onChangeThumbnailList }) => {
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
  const sliderRef = useRef();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const totalSlides = thumbnailList.length ? thumbnailList.length : 0;
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
          {slideIndex !== 0 && <SliderButton className="mr-12" onClick={onPrevSlide} />}
          {(totalSlides === 1 || slideIndex === totalSlides - 1) && <SliderButton isNext onClick={onNextSlide} />}
        </Box>
      </Box>
      <Box display="flex" flexGrow={1} overflow="hidden">
        <UploadButton onChangeThumbnailId={onChangeThumbnailId} onChangeThumbnailList={onChangeThumbnailList} />
        {totalSlides && (
          <ThumbnailSlider
            ref={sliderRef}
            thumbnailList={thumbnailList}
            thumbnailId={thumbnailId}
            onChangeThumbnailId={onChangeThumbnailId}
            onGoToSlide={onGoToSlide}
            settings={settings}
          />
        )}
      </Box>
    </>
  );
};

SettingThumbnails.propTypes = {
  thumbnailId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  thumbnailList: PropTypes.array,
  onChangeThumbnailId: PropTypes.func,
  onChangeThumbnailList: PropTypes.func,
};

export default SettingThumbnails;

const useStyles = makeStyles(() => ({
  titleWrapper: {
    position: "relative",
    zIndex: 2,
  },
}));
