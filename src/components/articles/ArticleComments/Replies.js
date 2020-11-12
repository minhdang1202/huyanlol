import React from "react";
import PropTypes from "prop-types";
import { Box, Divider } from "@material-ui/core";
import Comment from "./Comment";

const Replies = ({ hasReply, replyList }) => {
  return (
    <Box display="flex" mt={1}>
      <Divider orientation="vertical" className="mr-12" flexItem />
      <Box>
        {hasReply &&
          replyList.map((reply, index) => (
            <Comment key={index} comment={reply} className={index === replyList.length - 1 ? null : "mb-8"} />
          ))}
      </Box>
    </Box>
  );
};

Replies.propTypes = {
  hasReply: PropTypes.bool,
  replyList: PropTypes.array,
};

export default Replies;
