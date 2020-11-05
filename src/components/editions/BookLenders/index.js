import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Typography, Box, Button, Paper, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { LangConstant } from "const";
import clsx from "clsx";
import Lender from "./Lender";
import LenderList from "../LenderList";
import Processing from "components/Processing";
import { EditionTypes } from "redux/edition.redux";

const BookLenders = ({ lendersList, totalLenders, editionId, onGetLendersList }) => {
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const onOpenLenderList = () => {
    setIsOpen(true);
  };

  const onCloseLenderList = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    onGetLendersList({ editionId });
  }, []);

  return (
    <>
      <LenderList isOpen={isOpen} onClose={onCloseLenderList} editionId={editionId} />
      {totalLenders ? (
        <Paper className={clsx("paper", classes.root)}>
          <Box>
            <Typography variant="h6">{totalLenders + " " + getLabel("TXT_EDITION_LENDERS_TITLE")}</Typography>
            <Button size="medium" variant="text" onClick={onOpenLenderList}>
              {getLabel("TXT_EDITION_SEE_MORE")}
            </Button>
          </Box>
          <Box>
            {lendersList.slice(0, 4).map((lender, index) => {
              return <Lender key={index} {...lender} />;
            })}
          </Box>
        </Paper>
      ) : (
        <Processing isShow={true} />
      )}
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
  lendersList: PropTypes.array,
  totalLenders: PropTypes.number,
  editionId: PropTypes.number,
  onGetLendersList: PropTypes.func,
};

BookLenders.defaultProps = {
  lendersList: [],
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

export default connect(mapStateToProps, mapDispatchToProps)(BookLenders);
