import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";
import MainLayout from "layouts/MainLayout";
import { makeStyles, useMediaQuery, useTheme, Grid, Container, Divider, Box, Hidden } from "@material-ui/core";
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
import { InfoIcon, CartIcon } from "icons";
import { PathConstant } from "const";
import { getNumberIdFromQuery, getTitleNoMark, getImageBase64 } from "utils";
import { CustomBreadcrumb } from "components";

const BookDetail = ({ book, bookCover, lendersList, totalLenders }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const appBarProps = { isDetail: true, className: classes.appBarMobile };
  const SELECT_TABS = [
    {
      icon: <InfoIcon />,
      label: getLabel("TXT_BOOKDETAIL_BOOK_INFO"),
      value: "info",
    },
    {
      icon: <CartIcon />,
      label: getLabel("TXT_BOOKDETAIL_BUY_BOOK"),
      value: "cart",
    },
  ];

  const [selectedTab, setSelectedTab] = useState(SELECT_TABS[0].value);
  const onChangeTab = tab => {
    setSelectedTab(tab);
  };
  return (
    <MainLayout appBarProps={appBarProps}>
      {isMobile ? (
        <Box>
          <BookInfo
            authorName={book.authorName}
            title={book.title}
            rateAvg={book.rateAvg}
            bookCover={bookCover}
            lendersList={lendersList}
            totalLenders={totalLenders}
          />
          <CustomTabs onChangeTab={onChangeTab} tabs={SELECT_TABS} />
          {selectedTab === SELECT_TABS[0].value ? (
            <>
              <BookDescription description={book.description} />
              <Divider />
              <WriteReview />
              <BookReviews />
            </>
          ) : (
            <Hidden xsUp>
              <BookPriceCompare />
            </Hidden>
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
                lendersList={lendersList}
                totalLenders={totalLenders}
              />
              <AppDownload />
              <Hidden xsUp>
                <BookPriceCompare />
              </Hidden>
            </Grid>
            <Grid item sm={8}>
              <BookDescription description={book.description} />
              <BookLenders lendersList={lendersList.slice(0, 4)} totalLenders={totalLenders} />
              <WriteReview />
              <BookReviews />
            </Grid>
          </Grid>
        </Container>
      )}
    </MainLayout>
  );
};

const useStyles = makeStyles(theme => ({
  rootDesktop: {
    maxWidth: 1020,
    paddingTop: theme.spacing(3),
    "&>*:first-child": {
      marginBottom: theme.spacing(2),
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
      "& svg": {
        fill: `${theme.palette.white} !important`,
      },
    },
  },
}));

BookDetail.propTypes = {
  book: PropTypes.object,
  bookCover: PropTypes.string,
  lendersList: PropTypes.array,
  totalLenders: PropTypes.number,
};

BookDetail.defaultProps = {
  book: {},
};

export const getServerSideProps = async ({ res, query }) => {
  let bookId = query && query.book ? query.book : null;
  const isOnlyNumber = /^\d+$/.test(bookId);
  bookId = isOnlyNumber ? bookId : getNumberIdFromQuery(bookId);
  let book = await axios.get(`https://fordevv2.gatbook.org/api/v1/book_edition/${bookId}`);
  book = book.data;

  if (book.data) {
    book = book.data;
    const { title, editionId, imageId } = book;
    if (isOnlyNumber) {
      const bookTitleNoMark = getTitleNoMark(title);
      res.writeHead(301, {
        Location: PathConstant.BOOK_DETAIL(bookTitleNoMark, editionId),
      });
      res.end();
    }

    const bookCover = await getImageBase64(imageId);

    let lenders = await axios.put(`https://fordevv2.gatbook.org/api/v1/book_edition/_find_sharing_users`, {
      criteria: {
        editionId: editionId,
      },
    });
    lenders = lenders.data.data;
    const totalLenders = lenders.total;
    let lendersList = lenders.pageData;
    // lenders = lenders.map(async lender => {
    //   const { name, address, distanceToUser, imageId } = lender;
    //   const lenderAvatar = imageId ? await getImageBase64(imageId) : null;
    //   return {
    //     name,
    //     address,
    //     distanceToUser,
    //     lenderAvatar,
    //   };
    // });

    return {
      props: {
        book: book,
        bookCover: bookCover,
        lendersList: lendersList,
        totalLenders: totalLenders,
      },
    };
  }
  res.status(404).end();
};

export default BookDetail;
