import React, { memo, useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { uuid } from "utils";
import StringFormat from "string-format";
import { LangConstant, AppConstant, PathConstant } from "const";
import { AppLink } from "components";
const ListCategory = props => {
  const { classes } = props;
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_BOOKS);
  const [isFullCategory, setIsFullCategory] = useState(false);
  const fullList = AppConstant.BOOK_SUGGESTION_CATEGORY;
  const shortList = AppConstant.BOOK_SUGGESTION_CATEGORY.slice(0, 5);
  const categoryList = isFullCategory ? fullList : shortList;

  const onClickMore = () => setIsFullCategory(true);
  return (
    <Grid container className={clsx(defaultClasses.root, classes.root)}>
      <Grid item xs={12}>
        <Typography variant="h6" component="p">
          {getLabel("TXT_LIST_CATEGORY")}
        </Typography>
      </Grid>
      <Grid item xs={12} className={clsx(defaultClasses.main, classes.main)}>
        <Paper className={clsx(defaultClasses.paper, classes.paper)}>
          <Box>
            {categoryList.map(item => (
              <AppLink key={uuid()} to={StringFormat(PathConstant.COLLECTION_BOOKS_CATEGORY_ID, item.id)}>
                <Button
                  variant="contained"
                  color="primary"
                  className={clsx("light-blue-button", defaultClasses.item, classes.item)}
                >
                  <Typography>{getLabel(item.titleKey)}</Typography>
                </Button>
              </AppLink>
            ))}
          </Box>
          {!isFullCategory && (
            <Typography variant="button" component="p" className={defaultClasses.seeMore} onClick={onClickMore}>
              {StringFormat(getLabel("FM_SEE_MORE_CATEGORY"), fullList.length - shortList.length)}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

ListCategory.propTypes = {
  data: PropTypes.array,
  total: PropTypes.array,
  classes: PropTypes.object,
};
ListCategory.defaultProps = { title: "", classes: {} };

export default memo(ListCategory);

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: 20,
  },
  main: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2.5),
  },
  item: {
    padding: 11,
    borderRadius: 4,
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
  seeMore: {
    display: "block",
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2.5),
    cursor: "pointer",
  },
}));
