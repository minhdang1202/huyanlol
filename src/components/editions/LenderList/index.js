import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { DialogContent } from "@material-ui/core";
import { LangConstant } from "const";
import Dialog from "components/DialogLayout";
import DialogTitle from "components/DialogLayout/DialogTitle";
import DialogActions from "components/DialogLayout/DialogActions";
import LenderListTitle from "./LenderListTitle";
import LenderListSelect from "./LenderListSelect";
import LenderListContent from "./LenderListContent";

const LenderList = ({ isOpen, onClose }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const SELECT_LIST = [
    { value: "activityDuration", title: getLabel("TXT_LENDERLIST_ACTIVITY_DURATION") },
    { value: "distance", title: getLabel("TXT_LENDERLIST_DISTANCE") },
  ];
  const [lenderFilter, setLenderFilter] = useState(SELECT_LIST[0].value);
  const onChangeLenderFilter = value => {
    setLenderFilter(value);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle title={getLabel("TXT_BOOKDETAIL_LENDERS_TITLE")} onClose={() => onClose()}>
        <LenderListTitle totalLenders={TOTAL_LENDERS_DEMO} />
      </DialogTitle>
      <DialogActions>
        <LenderListSelect
          selectList={SELECT_LIST}
          lenderFilter={lenderFilter}
          onChangeLenderFilter={onChangeLenderFilter}
        />
      </DialogActions>
      <DialogContent>
        <LenderListContent lenderList={LENDER_LIST_DEMO} />
      </DialogContent>
    </Dialog>
  );
};

const TOTAL_LENDERS_DEMO = 23;
const LENDER_LIST_DEMO = Array(10).fill({
  name: "Richard Brown",
  avatar: "/images/img-demo-avatar.jpg",
  address: "Số 41, Ngõ 20, 14 đường Hồ Tùng Mậu, Mai Dịch, Cầu Giấy, Hà Nội, Việt Nam",
  distance: "1km",
});

LenderList.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default LenderList;
