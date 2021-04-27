import React, { useState } from "react";
import StringFormat from "string-format";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import MainLayout from "layouts/MainLayout";
import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Grid,
  Container,
  Divider,
  Box,
  Hidden,
  Typography,
} from "@material-ui/core";
import {
  BookInfo,
  BookDescription,
  AppDownload,
  WriteReview,
  BookReviews,
  BookPriceCompare,
  BookLenders,
  CustomTabs,
} from "components/editions";
import { PathConstant } from "const";
import { EditionService } from "services";
import { getNumberIdFromQuery, getTitleNoMark, getImageById, getAbsolutePath } from "utils";
import { CustomBreadcrumb } from "components";

const BookDetail = ({ book, bookCover }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const shareUrl = getAbsolutePath(StringFormat(PathConstant.FM_BOOK_DETAIL_ID, book.editionId));
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const appBarProps = { isDetail: true, shareUrl, className: classes.appBarMobile };
  const headProps = { title: book.title, description: book.description, ogImage: bookCover };
  const SELECT_TABS = [
    {
      icon: <Box className="ic-info-circle" />,
      label: getLabel("TXT_EDITION_BOOK_INFO"),
      value: "info",
    },
    {
      icon: <Box className="ic-shopping-cart" />,
      label: getLabel("TXT_EDITION_BUY_BOOK"),
      value: "cart",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(SELECT_TABS[0].value);
  const onChangeTab = tab => {
    setSelectedTab(tab);
  };
  return (
    <MainLayout className={classes.root} appBarProps={appBarProps} headProps={headProps}>
      {isMobile ? (
        <Box>
          <BookInfo
            authorName={book.authorName}
            title={book.title}
            rateAvg={book.rateAvg}
            bookCover={bookCover}
            editionId={book.editionId}
          />
          <CustomTabs onChangeTab={onChangeTab} tabs={SELECT_TABS} />
          {selectedTab === SELECT_TABS[0].value ? (
            <>
              <BookDescription description={book.description} />
              <Divider />
              <WriteReview editionId={book.editionId} />
              <BookReviews editionId={book.editionId} />
            </>
          ) : (
            <>
              <Hidden xsUp>
                <BookPriceCompare />
              </Hidden>
              <Typography className={classes.text}>{getLabel("TXT_EDITION_NO_SUPPORT_PRICE")}</Typography>
            </>
          )}
        </Box>
      ) : (
        <Container className={classes.rootDesktop}>
          <CustomBreadcrumb bookName={book.title} />
          <Grid container>
            <Grid item sm={4}>
              <BookInfo
                authorName={book.authorName}
                title={book.title}
                rateAvg={book.rateAvg}
                bookCover={bookCover}
                editionId={book.editionId}
              />
              <AppDownload />
              <Hidden xsUp>
                <BookPriceCompare />
              </Hidden>
            </Grid>
            <Grid item sm={8}>
              <BookDescription description={book.description} />
              <BookLenders editionId={book.editionId} />
              <WriteReview editionId={book.editionId} bookName={book.title} />
              <BookReviews editionId={book.editionId} />
            </Grid>
          </Grid>
        </Container>
      )}
    </MainLayout>
  );
};

export const getServerSideProps = async ({ res, query }) => {
  let editionId = query && query.edition ? query.edition : null;
  const isOnlyNumber = /^\d+$/.test(editionId);
  editionId = isOnlyNumber ? editionId : getNumberIdFromQuery(editionId);
  const bookDetailResponse = await EditionService.getBookDetail(editionId);
  let book = bookDetailResponse.data;

  if (book.data) {
    book = book.data;
    const { title, imageId } = book;
    if (isOnlyNumber) {
      const bookTitleNoMark = getTitleNoMark(title);
      res
        .writeHead(301, {
          Location: StringFormat(PathConstant.FM_BOOK_DETAIL, bookTitleNoMark, editionId),
        })
        .end();
    }
    const bookCover = imageId ? getImageById(imageId) : null;

    return {
      props: {
        book: book,
        bookCover: bookCover,
      },
    };
  }
  res.status(404).end();
};

BookDetail.propTypes = {
  book: PropTypes.object,
  bookCover: PropTypes.string,
};

BookDetail.defaultProps = {
  book: {},
};

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      paddingTop: 0,
    },
  },
  rootDesktop: {
    maxWidth: 1020,
    paddingTop: theme.spacing(3),
    "&>*:first-child": {
      "&+*": {
        "&>*:first-child": {
          "&>*:not(:last-child)": {
            marginBottom: theme.spacing(3),
          },
          paddingRight: theme.spacing(2.5),
        },
        "&>*:last-child": {
          "&>*:not(:last-child)": {
            marginBottom: theme.spacing(2),
          },
        },
      },
    },
  },
  appBarMobile: {
    [theme.breakpoints.down("xs")]: {
      position: "static !important",
      boxShadow: "none !important",
      background: "none !important",
      "& *": {
        color: `${theme.palette.white} !important`,
      },
    },
  },
  text: {
    color: theme.palette.grey[500],
    display: "inline-block",
    width: "100%",
    marginTop: theme.spacing(6),
    textAlign: "center",
  },
}));

export default BookDetail;
