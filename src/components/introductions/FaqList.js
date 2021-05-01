import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, Typography, Accordion, AccordionSummary, AccordionDetails, Box, Button } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { LangConstant, AppConstant } from "const";
import { AppLink } from "components";

const FaqList = ({ faqList, expandedId, setExpandedId }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);

  const onChangeExpandedItem = faqItemId => {
    return (e, expandedState) => setExpandedId(!expandedState ? -1 : faqItemId);
  };

  useEffect(() => {
    const expandedItem = document.getElementById(`faqItem-${expandedId}`);
    expandedItem?.scrollIntoView();
  }, [expandedId]);

  return (
    <>
      {faqList.map((faqItem, index) => (
        <Accordion
          id={`faqItem-${index}`}
          key={index}
          expanded={expandedId === index}
          onChange={onChangeExpandedItem(faqItem.id)}
          square
          classes={{
            root: classes.accordionRoot,
            expanded: classes.expanded,
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            classes={{
              root: classes.accordionSummaryRoot,
              content: classes.content,
              expanded: classes.accordionSummaryExpanded,
            }}
          >
            <Typography className="semiBold-lg-txt">{faqItem.title}</Typography>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.accordionDetailsRoot }}>
            <Box>
              {faqItem.body.map((faqBodyItem, faqBodyIndex) => (
                <Typography className="mb-16" key={`faqBody-${index}-${faqBodyIndex}`}>
                  {faqBodyItem}
                </Typography>
              ))}
            </Box>
            <Box className="space-between-root">
              <Typography>{getLabel("TXT_ANSWER_NOT_HELP_YOUR_QUESTION")}</Typography>
              <AppLink to={AppConstant.GAT_FB_MESSENGER} className="no-style-link">
                <Button
                  variant="contained"
                  className={clsx("dark-blue-button", classes.button)}
                  startIcon={<Box className="ic-comment-alt" fontWeight={400} />}
                >
                  {getLabel("TXT_MESSAGE_WITH_GAT")}
                </Button>
              </AppLink>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default FaqList;

FaqList.propTypes = {
  faqList: PropTypes.array,
  expandedId: PropTypes.number,
  setExpandedId: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  accordionRoot: {
    padding: 0,
    paddingBottom: theme.spacing(1),
    boxShadow: "none",
    "&:before": {
      height: 0,
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: theme.spacing(1),
    },
  },
  accordionSummaryRoot: {
    padding: theme.spacing(0, 3),
    borderRadius: 8,
    transition: "min-height 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(0, 2),
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      "&:hover": {
        "&, &>*": {
          backgroundColor: "transparent !important",
        },
      },
    },
    "&:hover": {
      "&, &>*": {
        backgroundColor: theme.palette.grey[100],
      },
    },
  },
  accordionDetailsRoot: {
    flexDirection: "column",
    "&>*:first-child": {
      padding: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1, 0),
      },
    },
    "&>*:last-child": {
      margin: theme.spacing(0, -2),
      padding: theme.spacing(2, 3),
      backgroundColor: theme.palette.grey[100],
      borderRadius: 8,
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "start",
        "&>*:first-child": {
          marginBottom: theme.spacing(2),
        },
      },
      [theme.breakpoints.down("xs")]: {
        margin: 0,
        padding: theme.spacing(2),
      },
    },
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  expanded: {
    margin: "0px !important",
  },
  accordionSummaryExpanded: {
    backgroundColor: theme.palette.primary[100],
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "transparent",
      minHeight: 0,
    },
  },
  content: {
    "&>*": {
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px !important",
      },
    },
  },
}));
