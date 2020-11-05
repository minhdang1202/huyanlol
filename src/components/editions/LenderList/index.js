import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DialogContent } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { LangConstant } from "const";
import Dialog from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import DialogActions from "components/DialogLayout/DialogActions";
import LenderListTitle from "./LenderListTitle";
import LenderListSelect from "./LenderListSelect";
import LenderListContent from "./LenderListContent";
import { EditionTypes } from "redux/edition.redux";

const LenderList = ({ isOpen, onClose, editionId, lendersList, totalLenders, onGetLendersList }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const SELECT_LIST = [
    { value: "activityDuration", title: getLabel("TXT_EDITION_ACTIVITY_DURATION") },
    { value: "distance", title: getLabel("TXT_EDITION_DISTANCE") },
  ];
  const [lenderFilter, setLenderFilter] = useState(SELECT_LIST[0].value);

  const onChangeLenderFilter = value => {
    setLenderFilter(value);
  };

  useEffect(() => {
    onGetLendersList({ editionId });
  }, []);

  useEffect(() => {
    switch (lenderFilter) {
      case "distance":
        onGetLendersList({ editionId, sort: { distanceToUser: "ASC" } });
        break;
      default:
        onGetLendersList({ editionId });
    }
  }, [lenderFilter]);

  return (
    <Dialog open={isOpen}>
      <DialogTitle title={getLabel("TXT_EDITION_LENDERS_TITLE")} onClose={() => onClose()}>
        {totalLenders ? (
          <LenderListTitle totalLenders={totalLenders} />
        ) : (
          <Skeleton animation="wave" width="40%" height={24} />
        )}
      </DialogTitle>
      <DialogActions>
        <LenderListSelect
          selectList={SELECT_LIST}
          lenderFilter={lenderFilter}
          onChangeLenderFilter={onChangeLenderFilter}
        />
      </DialogActions>
      <DialogContent>
        {totalLenders ? (
          <LenderListContent lenderList={lendersList} />
        ) : (
          <Skeleton animation="wave" variant="rect" width="100%" height={350} />
        )}
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    totalLenders: state.editionRedux.totalLenders,
    lendersList: state.editionRedux.lendersList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetLendersList: data => dispatch({ type: EditionTypes.REQUEST_GET_LENDERS_LIST, ...data }),
  };
};

LenderList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  lendersList: PropTypes.array,
  totalLenders: PropTypes.number,
  onGetLendersList: PropTypes.func,
  editionId: PropTypes.number,
};

LenderList.defaultProps = {
  lendersList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(LenderList);
