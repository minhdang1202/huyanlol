import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DialogContent, Divider, Box, CircularProgress, Hidden, makeStyles, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { LangConstant, AppConstant } from "const";
import Dialog from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import DialogActions from "components/DialogLayout/DialogActions";
import LenderListTitle from "./LenderListTitle";
import LenderListSelect from "./LenderListSelect";
import { EditionTypes } from "redux/edition.redux";
import Lender from "./Lender";

const LenderList = ({ isOpen, onClose, editionId }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const SELECT_LIST = [
    { value: "activityDuration", title: getLabel("TXT_EDITION_ACTIVITY_DURATION") },
    { value: "distance", title: getLabel("TXT_EDITION_DISTANCE") },
  ];

  const dispatch = useDispatch();
  const dispatchGetLendersList = data => dispatch({ type: EditionTypes.REQUEST_GET_LENDERS_LIST, ...data });

  const [lenders, total] = useSelector(state => [state.editionRedux.lendersList, state.editionRedux.totalLenders]);

  const [totalLenders, setTotalLenders] = useState();
  const [lenderFilter, setLenderFilter] = useState(SELECT_LIST[0].value);
  const [lendersList, setLendersList] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChangeFilter, setHasChangeFilter] = useState(false);

  const classes = useStyles({ totalLenders, hasChangeFilter });

  const onScroll = e => {
    if (isLoading || !totalLenders || !lendersList) return;
    if (lendersList.length >= totalLenders) {
      setIsLoading(false);
      return;
    }
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight <= scrollTop + clientHeight) {
      onFetchMoreData();
      setIsLoading(true);
    }
  };

  const onChangeLenderFilter = value => {
    setLenderFilter(value);
  };

  const onFetchWithFilter = pageNum => {
    switch (lenderFilter) {
      case "distance":
        dispatchGetLendersList({ editionId, pageNum: pageNum, sort: { distanceToUser: AppConstant.SORT_ORDER.asc } });
        break;
      default:
        dispatchGetLendersList({ editionId, pageNum: pageNum });
    }
  };

  const onFetchMoreData = () => {
    onFetchWithFilter(pageNum + 1);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    if (isOpen) {
      onFetchWithFilter(1);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      onFetchWithFilter(1);
      setHasChangeFilter(true);
    }
  }, [lenderFilter]);

  useEffect(() => {
    if (lendersList && pageNum != 1) {
      setLendersList(lendersList.concat(lenders));
      setIsLoading(false);
      setHasChangeFilter(false);
      return;
    }
    if (lenders) {
      setLendersList(lenders);
      setIsLoading(false);
      setHasChangeFilter(false);
    }
    if (!totalLenders) {
      setTotalLenders(total);
    }
  }, [lenders]);

  return (
    <Dialog open={isOpen} onBackdropClick={() => onClose()}>
      <DialogTitle title={getLabel("TXT_EDITION_LENDERS_TITLE")} onClose={() => onClose()}>
        {totalLenders || totalLenders === 0 ? (
          <LenderListTitle totalLenders={totalLenders} />
        ) : (
          <Hidden xsDown>
            <Skeleton animation="wave" width="40%" height={30} m="auto" />
          </Hidden>
        )}
      </DialogTitle>
      <DialogActions>
        <LenderListSelect
          selectList={SELECT_LIST}
          lenderFilter={lenderFilter}
          onChangeLenderFilter={onChangeLenderFilter}
        />
      </DialogActions>
      {totalLenders != 0 ? (
        <DialogContent onScroll={onScroll}>
          {!hasChangeFilter &&
            lendersList &&
            lendersList.map((lender, index) => {
              return (
                <Box key={index}>
                  <Lender {...lender} />
                  {index !== lendersList.length - 1 ? <Divider /> : null}
                </Box>
              );
            })}
          {(isLoading || hasChangeFilter) && <CircularProgress className={classes.loading} />}
        </DialogContent>
      ) : (
        <DialogContent>
          <Typography className={classes.text}>{getLabel("TXT_EDITION_NO_LENDER")}</Typography>
        </DialogContent>
      )}
    </Dialog>
  );
};

LenderList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  editionId: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  loading: {
    margin: theme.spacing(5, "auto"),
    textAlign: "center",
    display: "inherit",
    [theme.breakpoints.down("xs")]: {
      margin: ({ totalLenders, hasChangeFilter }) =>
        typeof totalLenders === "undefined" || hasChangeFilter ? `calc((100% - 40px) / 2)` : theme.spacing(5, "auto"),
    },
  },
  text: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(3, 0),
  },
}));

export default LenderList;
