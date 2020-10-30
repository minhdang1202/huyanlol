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
    backgroundColor: palette.white,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  dcontainer: {
    width: "472px",
    borderRadius: "10px",
  },
  mcontainer: {
    width: "100vw",
    height: "100vh",
  },
  header: {
    width: "100%",
    height: "74px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    borderRadius: "10px",
    padding: "0 18px 0 24px",
  },
  mheader: {
    width: "100%",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-start",
    paddingLeft: "16px",
  },
  title: {
    fontSize: "22px",
    fontWeight: 600,
    color: primary,
  },
  mtitle: {
    fontSize: "18px",
    margin: "6px",
  },
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: disabled,
    margin: 0,
  },
  content: {
    width: "100%",
    padding: " 0px 24px 0px 24px",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  mcontent: {
    width: "100%",
    height: "100%",
    padding: " 0px 16px 0px 16px",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  form: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },

  textInput: {
    height: "60px",
    boxShadow: `inset 0 -1px 0 0 ${disabled}`,
    margin: "8px 0px 8px 0px",
    border: "none",
    fontSize: "18px",
    color: secondary,
    paddingLeft: "12px",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: secondary,
      fontWeight: "600",
    },
  },
  mtextInput: { margin: "20px 0px 20px 0px" },
  textOfInput: {
    fontSize: "18px",
    color: palette.black,
  },
  inputLabel: {
    paddingLeft: "12px",
    fontSize: "18px",
    color: secondary,
    fontWeight: "600",
  },
  loginBtn: {
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
    "&:hover": {
      backgroundColor: disabled,
    },
  },
  bottom: {
    margin: "24px",
    width: "100%",
    height: "140px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sclText: {
    fontSize: "16px",
    color: secondary,
  },
  sclBtnContainer: {
    flexDirection: "row",
    margin: "24px 24px 0px 24px",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  sclBtn: {
    width: "48%",
    height: "45px",
    borderRadius: "27px",
    border: "none",
    color: palette.white,
    fontSize: "16px",
    fontWeight: 600,
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      backgroundColor: disabled,
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
    width: "75px",
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
