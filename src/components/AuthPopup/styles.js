const styles = {
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
  },
  root: {
    backgroundColor: "#b1b1b1",
    height: "100vh",
    width: "100vw",
  },
  container: {
    width: "472px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
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
    color: "#001a39",
  },
  didiver: {
    width: "100%",
    height: "1px",
    backgroundColor: "#d2d9de",
    margin: 0,
  },
  textInput: {
    width: "424px",
    height: "60px",
    boxShadow: "inset 0 -1px 0 0 #d2d9de;",
    margin: "8px",
    border: "none",
    fontSize: "18px",
    color: "#7b93a5",
    paddingLeft: "12px",
    "&:focus": {
      outline: "none",
    },
    "&::placeholder": {
      color: "#7b93a5",
    },
  },
  loginBtn: {
    width: "424px",
    height: "45px",
    borderRadius: "27px",
    backgroundColor: "#5aa4cc",
    color: "#fff",
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
    color: "#7b93a5",
    margin: "32px 138.5px 0px 138.5px",
  },
  sclBtnConatainer: {
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
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    "&:focus": {
      outline: "none",
    },
  },
  fbBtn: {
    backgroundColor: "#4b7ccf",
  },
  ggBtn: {
    backgroundColor: "#ec3d34",
  },
  footText: {
    fontSize: "16px",
    color: "#7b93a5",
    margin: "32px 0px 24px 0px",
  },
  resLink: {
    fontWeight: "600",
    color: "#5aa4cc",
  },
};
export default styles;
