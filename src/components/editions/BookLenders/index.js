import React, { useState, useEffect } from "react";
import StringFormat from "string-format";
import { connect } from "react-redux";
import { Typography, Box, Button, Paper, CircularProgress, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import clsx from "clsx";
import Lender from "./Lender";
import LenderList from "../LenderList";
import { EditionTypes } from "redux/edition.redux";

const BookLenders = ({ editionId, ...reduxProps }) => {
  const { onGetTotalLenders, onGetNearestLenders } = reduxProps;
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [nearestLenders, setNearestLenders] = useState();
  const [totalLenders, setTotalLenders] = useState();

  const onOpenLenderList = () => {
    setIsOpen(true);
  };

  const onCloseLenderList = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    onGetNearestLenders(editionId);
    onGetTotalLenders(editionId);
  }, []);

  useEffect(() => {
    if (!nearestLenders) {
      setNearestLenders(reduxProps.nearestLenders);
    }
    if (!totalLenders) {
      setTotalLenders(reduxProps.totalLenders);
    }
  }, [reduxProps.nearestLenders]);

  return totalLenders === 0 ? null : (
    <>
      <LenderList isOpen={isOpen} onClose={onCloseLenderList} editionId={editionId} />
      <Paper className={clsx("paper", classes.root)}>
        <Box>
          {totalLenders && nearestLenders ? (
            <>
              <Typography variant="h6">{StringFormat(getLabel("FM_EDITION_BOOK_LENDERS"), totalLenders)}</Typography>
              <Button size="medium" variant="text" onClick={onOpenLenderList}>
                {getLabel("TXT_EDITION_SEE_MORE")}
              </Button>
            </>
          ) : (
            <Skeleton animatiion="wave" width="100%" height={40} />
          )}
        </Box>
        <Box>
          {nearestLenders
            ? nearestLenders.map((lender, index) => {
                return <Lender key={index} {...lender} />;
              })
            : Array(4)
                .fill("")
                .map((blank, index) => (
                  <Box key={index} height={100} width="100%" display="flex" alignItems="center" justifyContent="center">
                    <CircularProgress />
                  </Box>
                ))}
        </Box>
      </Paper>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    "& button": {
      color: `${theme.palette.primary.main} !important`,
    },
    "&>*:first-child": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      textTransform: "lowercase",
    },
    "&>*:nth-child(2)": {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
      gridGap: theme.spacing(0.5),
    },
  },
}));

BookLenders.propTypes = {
  editionId: PropTypes.number,
};

const mapStateToProps = state => {
  const { totalLenders, nearestLenders } = state.editionRedux;
  return {
    totalLenders,
    nearestLenders,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetTotalLenders: editionId => dispatch({ type: EditionTypes.REQUEST_GET_TOTAL_LENDERS, editionId: editionId }),
    onGetNearestLenders: editionId =>
      dispatch({ type: EditionTypes.REQUEST_GET_NEAREST_LENDERS, editionId: editionId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookLenders);
