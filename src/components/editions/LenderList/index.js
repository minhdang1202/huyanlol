import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import Dialog from "components/DialogLayout";
import LenderListTitle from "./LenderListTitle";
import LenderListSelect from "./LenderListSelect";
import LenderListContent from "./LenderListContent";

const LenderList = ({ isOpen, onClose }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const [lenderFilter, setLenderFilter] = useState();
  const onChangeLenderFilter = value => {
    setLenderFilter(value);
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => onClose()}
      title={getLabel("TXT_BOOKDETAIL_LENDERS_TITLE")}
      titleChildren={<LenderListTitle totalLenders={TOTAL_LENDERS_DEMO} />}
      actionChildren={<LenderListSelect lenderFilter={lenderFilter} onChangeLenderFilter={onChangeLenderFilter} />}
      contentChildren={<LenderListContent lenderList={LENDER_LIST_DEMO} />}
    />
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
