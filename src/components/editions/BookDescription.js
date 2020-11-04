import React, { useState } from "react";
import PropTypes from "prop-types";
import { Paper, Typography, Button, makeStyles } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { LangConstant } from "const";
import { cutString } from "utils";
import { FormatColorTextSharp } from "@material-ui/icons";

const BookDescription = ({ description }) => {
  description = description ? description : DEMO_DESCRIPTION;
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_BOOK_DETAIL);
  const [isFullContent, setIsFullContent] = useState(description.length <= LIMIT_DESCRIPTION);
  const [content, setContent] = useState(isFullContent ? description : cutString(LIMIT_DESCRIPTION, description));

  const onShowDescription = () => {
    setIsFullContent(true);
    setContent(description);
  };

  return (
    <Paper className={clsx("paper", classes.root)}>
      <Typography variant="h6">{getLabel("TXT_BOOKDETAIL_BOOK_INTRO")}</Typography>
      <Typography>{content}</Typography>
      {!isFullContent && (
        <Button size="large" className={clsx(classes.button, "blue-text")} onClick={onShowDescription}>
          {getLabel("TXT_BOOKDETAIL_READ_MORE")}
        </Button>
      )}
    </Paper>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      borderRadius: "0 !important",
    },
  },
  button: {
    marginLeft: theme.spacing(-1),
  },
}));

const LIMIT_DESCRIPTION = 250;
const DEMO_DESCRIPTION =
  "Sau khi Ford bị bắn, Dolores và Teddy điên cuồng tìm giết các thành viên hội đồng đang chạy trốn. Kế hoạch của cô là chiếm đóng cả thế giới loài người. Bernard bỏ trốn với Hale, cả hai đến được một cơ sở bí mật, nơi các “drone host” đang trích xuất thông tin từ các host thường nhằm theo dõi các vị khách trong công viên. Charlotte được ai đó bên ngoài công viên thông báo họ sẽ không được giải cứu trừ khi có được “Kiện hàng” hay chính là Peter Abernathy, cùng tất cả IP được lưu trữ trong bộ nhớ của ông";

BookDescription.propTypes = {
  description: PropTypes.string,
};

export default BookDescription;
