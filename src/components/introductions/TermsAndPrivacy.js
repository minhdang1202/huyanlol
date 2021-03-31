import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Paper, makeStyles, Typography, Box, Hidden } from "@material-ui/core";
import { LangConstant } from "const";
import TabPanel from "components/TabPanel";

const TermsAndPrivacy = ({ selectedTab }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INTRODUCTIONS);
  const termsTextValues = [
    { title: getLabel("TXT_TERMS_AMENDMENTS"), body: [getLabel("TXT_TERMS_AMENDMENTS_BODY")] },
    { title: getLabel("TXT_ADDITIONAL_TERMS"), body: [getLabel("TXT_ADDITIONAL_TERMS_BODY")] },
    { title: getLabel("TXT_GAT_PLATFORM"), body: [getLabel("TXT_GAT_PLATFORM_BODY")] },
    { title: getLabel("TXT_TERMINATION_OR_AMENDMENT_OF_THE_CONTRACT_BY_GAT") },
    {
      title: getLabel("TXT_TERMINATION_OR_AMENDMENT"),
      body: [
        getLabel("TXT_TERMINATION_OR_AMENDMENT_BODY_1"),
        getLabel("TXT_TERMINATION_OR_AMENDMENT_BODY_2"),
        getLabel("TXT_TERMINATION_OR_AMENDMENT_BODY_3"),
        getLabel("TXT_TERMINATION_OR_AMENDMENT_BODY_4"),
        getLabel("TXT_TERMINATION_OR_AMENDMENT_BODY_5"),
      ],
    },
    {
      title: getLabel("TXT_TRESPASSING_OR_FRAUDULENT_ACTIVITY"),
      body: [getLabel("TXT_TRESPASSING_OR_FRAUDULENT_ACTIVITY_BODY")],
    },
    { title: getLabel("TXT_SIGNUP_AND_PASSWORD_INFO") },
    { body: [getLabel("TXT_PRIVACY_BODY_1")] },
    {
      title: getLabel("TXT_PRIVACY_BODY_2"),
      body: [
        getLabel("TXT_PRIVACY_SUB_BODY_1"),
        getLabel("TXT_PRIVACY_SUB_BODY_2"),
        getLabel("TXT_PRIVACY_SUB_BODY_3"),
        getLabel("TXT_PRIVACY_SUB_BODY_4"),
      ],
    },
    {
      title: getLabel("TXT_PRIVACY_BODY_3"),
      body: [
        getLabel("TXT_PRIVACY_SUB_BODY_5"),
        getLabel("TXT_PRIVACY_SUB_BODY_6"),
        getLabel("TXT_PRIVACY_SUB_BODY_7"),
      ],
    },
    {
      title: getLabel("TXT_PROHIBITED_ACTION"),
      body: [
        getLabel("TXT_PROHIBITED_ACTION_BODY_1"),
        getLabel("TXT_PROHIBITED_ACTION_BODY_2"),
        getLabel("TXT_PROHIBITED_ACTION_BODY_3"),
        getLabel("TXT_PROHIBITED_ACTION_BODY_4"),
        getLabel("TXT_PROHIBITED_ACTION_BODY_5"),
        getLabel("TXT_PROHIBITED_ACTION_BODY_6"),
      ],
    },
    { title: getLabel("TXT_PROHIBITED_FORM_OF_USE"), body: [getLabel("TXT_PROHIBITED_FORM_OF_USE_BODY")] },
    { title: getLabel("TXT_CONTENT_BY_USER") },
    { title: getLabel("TXT_OVERVIEW"), body: [getLabel("TXT_OVERVIEW_BODY")] },
    {
      title: getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT"),
      body: [getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT_BODY_1")],
    },
    { title: getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT_BODY_2") },
    {
      title: getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT_BODY_3"),
      body: [
        getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT_SUB_BODY_1"),
        getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT_SUB_BODY_2"),
        getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT_SUB_BODY_3"),
      ],
    },
    { title: getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT_BODY_4") },
    { title: getLabel("TXT_PERMISSION_FROM_USER_FOR_GAT_BODY_5") },
    { title: getLabel("TXT_FEEDBACK"), body: [getLabel("TXT_FEEDBACK_BODY")] },
    { title: getLabel("TXT_OWNERSHIP"), body: [getLabel("TXT_OWNERSHIP_BODY")] },
    { title: getLabel("TXT_THIRD_PARTY"), body: [getLabel("TXT_THIRD_PARTY_BODY")] },
    { title: getLabel("TXT_WARNING"), body: [getLabel("TXT_WARNING_BODY")] },
    { title: getLabel("TXT_NEGATE_AND_NO_WARRANTY"), body: [getLabel("TXT_NEGATE_AND_NO_WARRANTY_BODY")] },
    {
      title: getLabel("TXT_GAT_NOT_WARRANT"),
      body: [getLabel("TXT_GAT_NOT_WARRANT_BODY_1"), getLabel("TXT_GAT_NOT_WARRANT_BODY_2")],
    },
    {
      title: getLabel("TXT_REFUSE_AND_RELEASE"),
      body: [getLabel("TXT_REFUSE_AND_RELEASE_BODY_1"), getLabel("TXT_REFUSE_AND_RELEASE_BODY_2")],
    },
    {
      title: getLabel("TXT_LIMITATION_OF_LIABILITY_AND_DAMAGE"),
      body: [getLabel("TXT_LIMITATION_OF_LIABILITY_AND_DAMAGE_BODY")],
    },
    { title: getLabel("TXT_OTHER_TERMS") },
    { title: getLabel("TXT_LAWS"), body: [getLabel("TXT_LAWS_BODY")] },
    { title: getLabel("TXT_ASSIGNMENT"), body: [getLabel("TXT_ASSIGNMENT_BODY")] },
    { title: getLabel("TXT_TITLE"), body: [getLabel("TXT_TITLE_BODY")] },
    { title: getLabel("TXT_COMPLAIN_AND_LIMIT"), body: [getLabel("TXT_COMPLAIN_AND_LIMIT_BODY")] },
    { title: getLabel("TXT_RIGHT_TO_GIVE_UP"), body: [getLabel("TXT_RIGHT_TO_GIVE_UP_BODY")] },
  ];

  return (
    <TabPanel index={1} value={selectedTab}>
      <Paper className={classes.root}>
        <Hidden xsDown>
          <Typography className="medium-xl-txt mb-24">{getLabel("TXT_TERMS_AND_PRIVACY")}</Typography>
        </Hidden>

        <Box>
          <Box className={classes.termsItem}>
            <Typography className={classes.textBold}>{getLabel("TXT_TERMS_OF_USE")}</Typography>
            <Typography className={classes.textBold}>{getLabel("TXT_ACCEPT_TERMS")}</Typography>
          </Box>
          {termsTextValues.map((term, index) => (
            <Box className={classes.termsItem} key={index}>
              <Typography gutterBottom>{term.title}</Typography>
              {term.body?.length &&
                term.body.map((body, index) => <Typography key={`body-${index}`}>{body}</Typography>)}
            </Box>
          ))}
        </Box>
      </Paper>
    </TabPanel>
  );
};

export default TermsAndPrivacy;

TermsAndPrivacy.propTypes = {
  selectedTab: PropTypes.number,
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.08)",
    borderRadius: 10,
    [theme.breakpoints.down("xs")]: {
      borderRadius: 0,
      padding: theme.spacing(3.25, 2),
    },
  },
  textBold: {
    fontWeight: "700 !important",
    [theme.breakpoints.down("xs")]: {
      fontWeight: "400 !important",
    },
  },
  termsItem: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(3),
    },
    "&>*": {
      color: "#000",
      [theme.breakpoints.up("sm")]: {
        fontSize: "18px",
        fontWeight: 400,
      },
    },
  },
}));
