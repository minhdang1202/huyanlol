import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { Toolbar, makeStyles, IconButton, Button, Box, Divider, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { LangConstant, AppConstant } from "const";
import { HEIGHT_APP_BAR } from "layouts/MainLayout/components/CustomAppBar";
import CharCountPopover from "./CharCountPopover";
import { UndoButton, RedoButton } from "../CustomEditor";
import SidebarMenu from "../CustomEditor/SidebarMenu";
import ArticleCreateActions from "redux/articleCreate.redux";
import { debounce } from "utils";

const CreateToolbar = ({ onOpenSetting }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t: getLabel } = useTranslation(LangConstant.NS_ARTICLE_CREATE);
  const [anchorCharCount, setAnchorCharCount] = useState(null);
  const [anchorSidebar, setAnchorSidebar] = useState(null);
  const hasCharOpen = Boolean(anchorCharCount);
  const hasSidebarOpen = Boolean(anchorSidebar);

  const { isSaveSuccess, isSaveFailure } = useSelector(({ articleCreateRedux }) => articleCreateRedux);

  const onOpenPopover = event => {
    setAnchorCharCount(event.currentTarget);
  };
  const onClosePopover = () => {
    setAnchorCharCount(null);
  };

  const onOpenSidebar = event => {
    setAnchorSidebar(event.currentTarget);
  };

  const onCloseSidebar = () => {
    setAnchorSidebar(null);
  };

  const onFinishSave = debounce(() => {
    dispatch(ArticleCreateActions.saveArticleSuccess());
  }, AppConstant.SNACKBAR_DURATION);

  useEffect(() => {
    if (isSaveSuccess || isSaveFailure) {
      onFinishSave();
    }
  }, [isSaveSuccess, isSaveFailure]);

  return (
    <Toolbar className={classes.root}>
      <IconButton edge="start" onClick={onOpenSidebar} className={hasSidebarOpen ? classes.rotateButton : null}>
        <Box className={clsx("ic-plus", classes.icon)} />
      </IconButton>
      <SidebarMenu anchorEl={anchorSidebar} open={hasSidebarOpen} onClose={onCloseSidebar} />
      <IconButton className={classes.undoButton} component="div">
        <UndoButton />
      </IconButton>
      <IconButton className={classes.undoButton} component="div">
        <RedoButton />
      </IconButton>
      <Divider orientation="vertical" />
      <Typography
        id={WORD_BOX_ID}
        aria-owns={hasCharOpen ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        className={clsx("grey-text", classes.popoverButton)}
        onMouseEnter={onOpenPopover}
        onMouseLeave={onClosePopover}
      ></Typography>
      <CharCountPopover
        id="mouse-over-popover"
        open={hasCharOpen}
        anchorEl={anchorCharCount}
        onClose={onClosePopover}
      />
      {isSaveSuccess && <Typography className={classes.success}>{getLabel("MSG_SAVE_ARTICLE_SUCCESS")}</Typography>}
      {isSaveFailure && <Typography className={classes.failure}>{getLabel("ERR_SAVE_ARTICLE")}</Typography>}
      <Button
        onClick={() => onOpenSetting()}
        variant="contained"
        className={clsx(classes.previewButton, "dark-blue-button")}
      >
        {getLabel("TXT_PREVIEW")}
      </Button>
    </Toolbar>
  );
};

CreateToolbar.propTypes = {
  onOpenSetting: PropTypes.func,
};

export const WORD_BOX_ID = "word-count";

const useStyles = makeStyles(theme => ({
  root: {
    height: HEIGHT_APP_BAR,
    padding: 0,
    "&>:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
    "& button": {
      height: "fit-content",
    },
    "& button:not(:last-child)": {
      width: 40,
      height: 40,
    },
    "& hr": {
      height: "60%",
      width: 2,
    },
  },
  previewButton: {
    padding: theme.spacing(0, 1.5),
    marginLeft: theme.spacing(3),
  },
  icon: {
    fontSize: 20,
    color: theme.palette.text.secondary,
  },
  popoverButton: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(1.5),
    height: "100%",
  },
  success: {
    color: theme.palette.success.dark,
  },
  failure: {
    color: theme.palette.error.main,
  },
  undoButton: {
    padding: 0,
    "& button": {
      width: 40,
      height: 40,
      borderRadius: "50%",
      cursor: "pointer",
      border: "none",
      background: "none",
      "&:focus": {
        outline: "none",
      },
      "&:disabled": {
        "& svg": {
          "& path": {
            "&:first-child": {
              stroke: theme.palette.grey[300],
            },
            "&:last-child": {
              fill: theme.palette.grey[300],
            },
          },
        },
      },
    },
  },
  rotateButton: {
    "& .ic-plus": {
      "&:before": {
        display: "block",
        transform: "rotate(45deg)",
      },
    },
  },
}));

export default CreateToolbar;
