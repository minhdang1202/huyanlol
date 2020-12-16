import React, { useState, useRef, useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { Box, Grid, makeStyles, useTheme, useMediaQuery, Hidden, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { ListCategory, CustomBreadcrumb } from "components";
import { PopularArticles, ListBooks } from "components/editions-collection";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import EditionAction from "redux/edition.redux";

const CollectionBooksPage = ({ categoryId }) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_COLLECTION_BOOKS);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const appBarProps = {
    isDetail: true,
    className: classes.appBar,
    appBarTitle: getLabel("TXT_MOST_BORROWING_BOOK"),
  };
  const headRef = useRef();
  const suggestionsCategoryId = useSelector(state => state.editionRedux.suggestionsCategoryId);
  const [pageNum, setPageNum] = useState(1);
  const onChangePage = (event, value) => {
    setPageNum(value);
    headRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const getTitle = categoryId => {
    let category = AppConstant.BOOK_SUGGESTION_CATEGORY.find(category => category.id === suggestionsCategoryId);
    if (categoryId && category) {
      return category.title;
    }
    return "TXT_MOST_BORROWING_BOOK";
  };
  useEffect(() => {
    if (categoryId) {
      dispatch(EditionAction.setSuggestionsCategoryId(categoryId));
    }
  }, [categoryId]);

  return (
    <MainLayout appBarProps={appBarProps}>
      <Grid container className={classes.root}>
        {!isMobile && (
          <Grid item xs={12} md={12} lg={12}>
            <CustomBreadcrumb />
            <Typography variant="h4" component="h1" ref={headRef}>
              {getLabel(getTitle(suggestionsCategoryId))}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sm={12} md={8} className={classes.mainContainer}>
          <ListBooks pageNum={pageNum} onChangePage={onChangePage} />
        </Grid>
        <Grid item md={4} className={classes.rightContainer}>
          <Hidden smDown>
            <Box className={classes.fixedPosition}>
              <PopularArticles />
              <ListCategory />
            </Box>
          </Hidden>
        </Grid>
      </Grid>
    </MainLayout>
  );
};
export const getServerSideProps = ({ query }) => {
  const categoryList = AppConstant.BOOK_SUGGESTION_CATEGORY;
  let isValidCategory = false;
  categoryList.forEach(async category => {
    if (category.id === parseInt(query.categoryId)) {
      isValidCategory = true;
    }
  });

  const categoryId = isValidCategory ? parseInt(query.categoryId) : null;
  return {
    props: {
      categoryId: categoryId,
    },
  };
};

CollectionBooksPage.propTypes = {
  categoryId: PropTypes.number,
};
export default CollectionBooksPage;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 1022,
    margin: "16px auto",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.down("xs")]: {
      margin: "auto",
      padding: 0,
    },
  },
  mainContainer: {
    marginTop: theme.spacing(2),
    paddingRight: 12,
    [theme.breakpoints.down("sm")]: {
      paddingRight: 0,
    },
  },
  rightContainer: {
    marginTop: theme.spacing(2),
    paddingLeft: 12,
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
    },
  },
  fixedPosition: {
    width: "100%",
    position: "sticky",
    top: theme.spacing(3),
    [theme.breakpoints.down("xs")]: {
      position: "relative",
    },
  },
}));
