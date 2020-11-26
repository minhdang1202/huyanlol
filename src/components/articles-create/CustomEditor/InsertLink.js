import React from "react";
import PropTypes from "prop-types";

const InsertLink = ({ contentState, entityKey, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={url} className="blue-text">
      {children}
    </a>
  );
};

InsertLink.propTypes = {
  contentState: PropTypes.object,
  entityKey: PropTypes.string,
};

export default InsertLink;
