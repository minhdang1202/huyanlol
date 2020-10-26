import React, { memo } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Link as MuiLink } from "@material-ui/core";

const AppLink = props => {
  const { to, as, children, ...otherProps } = props;
  let nextRouter = to || "#";
  let urlOnBrowser = as;

  return (
    <Link href={nextRouter} as={urlOnBrowser} passHref={true}>
      <MuiLink {...otherProps}>{children}</MuiLink>
    </Link>
  );
};

AppLink.propTypes = { to: PropTypes.string, as: PropTypes.string, className: PropTypes.string };
AppLink.defaultProps = {};

export default memo(AppLink);
