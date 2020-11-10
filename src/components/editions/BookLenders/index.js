import React, { useState, useEffect } from "react";
import StringFormat from "string-format";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Button, Paper, CircularProgress, makeStyles } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import clsx from "clsx";
import Lender from "./Lender";
import LenderList from "../LenderList";
import { EditionTypes } from "redux/edition.redux";

const BookLenders = ({ editionId }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const classes = useStyles();

  const dispatch = useDispatch();
  const dispatchGetNearestLenders = editionId =>
    dispatch({ type: EditionTypes.REQUEST_GET_NEAREST_LENDERS, editionId: editionId });

  const [total, nearestLenders] = useSelector(state => [
    state.editionRedux.totalLenders,
    state.editionRedux.nearestLenders,
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [totalLenders, setTotalLenders] = useState();

  const onOpenLenderList = () => {
    setIsOpen(true);
  };

  const onCloseLenderList = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatchGetNearestLenders(editionId);
  }, []);

  useEffect(() => {
    if (!totalLenders) {
      setTotalLenders(total);
    }
  }, [total]);

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
            <Skeleton animation="wave" width="100%" height={40} />
          )}
        </Box>
        <Box>
          {nearestLenders
            ? nearestLenders.map((lender, index) => <Lender key={index} {...lender} />)
            : Array.from({ length: 4 }, (_, index) => (
                <Box key={index} height={100} width="100%" display="flex" alignItems="center" justifyContent="center">
                  <CircularProgress />
                </Box>
              ))}
        </Box>
      </Paper>
    </>
  );
};

BookLenders.propTypes = {
  editionId: PropTypes.number,
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

export default BookLenders;
