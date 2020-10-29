import palette from "../../../public/material/palette";
const { primary, disabled, secondary } = palette.text;
const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  container: {
    width: "472px",
    borderRadius: "10px",
    backgroundColor: palette.white,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    borderRadius: "10px",
    padding: "0 24px 0 24px",
  },
  title: {
    width: "109px",
    height: "content",
    fontSize: "22px",
    fontWeight: 600,
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "normal",
    letterSpacing: "normal",
    color: primary,
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: disabled,
    margin: 0,
  },
  textInput: {
    width: "424px",
    height: "60px",
    boxShadow: `inset 0 -1px 0 0 ${disabled}`,
    margin: "8px",
    border: "none",
    fontSize: "18px",
    color: secondary,
    paddingLeft: "12px",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: secondary,
    },
  },
  loginBtn: {
    width: "424px",
    height: "45px",
    borderRadius: "27px",
    backgroundColor: palette.primary.main,
    color: palette.white,
    border: "none",
    margin: "34px 24px 0px 24px",
    fontSize: "18px",
    fontWeight: "600",

    "&:focus": {
      outline: "none",
    },
  },
  sclText: {
    fontSize: "16px",
    color: secondary,
    margin: "32px 138.5px 0px 138.5px",
  },
  sclBtnContainer: {
    width: "424px",
    flexDirection: "row",
    margin: "24px 24px 0px 24px",
    display: "flex",
    justifyContent: "space-between",
  },
  sclBtn: {
    width: "206px",
    height: "45px",
    borderRadius: "27px",
    border: "none",
    color: palette.white,
    fontSize: "16px",
    fontWeight: 600,
    "&:focus": {
      outline: "none",
    },
  },
  fsclBtnText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "88px",
  },
  gsclBtnText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "76px",
  },
  fbBtn: {
    backgroundColor: "#4b7ccf",
  },
  ggBtn: {
    backgroundColor: "#ec3d34",
  },
  footText: {
    fontSize: "16px",
    color: secondary,
    margin: "32px 0px 24px 0px",
  },
  resLink: {
    fontWeight: "600",
    color: palette.primary.main,
  },
};
export default styles;
