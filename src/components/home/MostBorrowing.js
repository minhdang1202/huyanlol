import React, { memo } from "react";
import PropTypes from "prop-types";
import { Box, makeStyles } from "@material-ui/core";
import { Section, BookSummary } from "components";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import { uuid } from "utils";

const MostBorrowing = props => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_HOME);

  return (
    <Section title={getLabel("TXT_MOST_BORROWING_BOOK")}>
      <Box className={classes.root}>
        {MOCK_DATA.map(book => (
          <Box key={uuid()} className={classes.item}>
            <BookSummary data={book} />
          </Box>
        ))}
      </Box>
    </Section>
  );
};

MostBorrowing.propTypes = {
  data: PropTypes.array,
};
MostBorrowing.defaultProps = {};

export default memo(MostBorrowing);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    "& > $item:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
    [theme.breakpoints.down("md")]: {
      overflow: "scroll",
    },
  },
  item: {
    maxWidth: 94,
  },
}));

const MOCK_DATA = [
  {
    title: "Sự im lặng của bầy cừu",
    author: "Thomas Harris",
    rating: 3,
    cover: "/images/img-demo-avatar.jpg",
  },
  {
    title: "Sự im lặng của bầy cừu",
    author: "Thomas Harris",
    rating: 2,
    cover: "/images/img-demo-avatar.jpg",
  },

  {
    title: "Sự im lặng của bầy cừu",
    author: "Thomas Harris",
    rating: 1,
    cover: "/images/img-demo-avatar.jpg",
  },
  {
    title: "Sự im lặng của bầy cừu",
    author: "Thomas Harris",
    rating: 4,
    cover: "/images/img-demo-avatar.jpg",
  },
  {
    title: "Sự im lặng của bầy cừu",
    author: "Thomas Harris",
    rating: 5,
    cover: "/images/img-demo-avatar.jpg",
  },
];
