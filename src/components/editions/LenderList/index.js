import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DialogContent, Divider, Box, CircularProgress, Hidden, makeStyles, Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { LangConstant } from "const";
import Dialog from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import DialogActions from "components/DialogLayout/DialogActions";
import LenderListTitle from "./LenderListTitle";
import LenderListSelect from "./LenderListSelect";
import { EditionTypes } from "redux/edition.redux";
import Lender from "./Lender";

const LenderList = ({ isOpen, onClose, editionId, ...reduxProps }) => {
  const { onGetLendersList } = reduxProps;
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const SELECT_LIST = [
    { value: "activityDuration", title: getLabel("TXT_EDITION_ACTIVITY_DURATION") },
    { value: "distance", title: getLabel("TXT_EDITION_DISTANCE") },
  ];
  const [totalLenders, setTotalLenders] = useState();
  const [lenderFilter, setLenderFilter] = useState(SELECT_LIST[0].value);
  const [lendersList, setLendersList] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChangeFilter, setHasChangeFilter] = useState(false);

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
        onGetLendersList({ editionId, pageNum: pageNum, sort: { distanceToUser: "ASC" } });
        break;
      default:
        onGetLendersList({ editionId, pageNum: pageNum });
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
      setLendersList(lendersList.concat(reduxProps.lendersList));
      setIsLoading(false);
      setHasChangeFilter(false);
      return;
    }
    if (reduxProps.lendersList) {
      setLendersList(reduxProps.lendersList);
      setIsLoading(false);
      setHasChangeFilter(false);
    }
    if (!totalLenders) {
      setTotalLenders(reduxProps.totalLenders);
    }
  }, [reduxProps.lendersList]);

  return (
    <Dialog open={isOpen}>
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

const useStyles = makeStyles(theme => ({
  loading: {
    margin: theme.spacing(5, "auto"),
    textAlign: "center",
    display: "inherit",
    [theme.breakpoints.down("xs")]: {
      marginTop: `calc((100% - 40px) / 2)`,
    },
  },
  text: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(3, 0),
  },
}));

const mapStateToProps = state => ({
  lendersList: state.editionRedux.lendersList,
  totalLenders: state.editionRedux.totalLenders,
});

const mapDispatchToProps = dispatch => ({
  onGetLendersList: data => dispatch({ type: EditionTypes.REQUEST_GET_LENDERS_LIST, ...data }),
});

LenderList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  editionId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(LenderList);
