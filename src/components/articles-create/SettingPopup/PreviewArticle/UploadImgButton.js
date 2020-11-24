import React, { useRef } from "react";
import { IconButton, Box } from "@material-ui/core";

const UploadImgButton = () => {
  const fileUploadRef = useRef();
  return (
    <>
      <IconButton onClick={() => fileUploadRef.current.click()}>
        <Box className="ic-camera" fontSize={16} />
      </IconButton>
      <input type="file" ref={fileUploadRef} hidden/>
    </>
  );
};

export default UploadImgButton;
