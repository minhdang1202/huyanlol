import React from "react";
// import { withAuthSync } from "../utils/auth";
import MainLayout from "../layouts/MainLayout";
import AuthPopup from "../components/AuthPopup";

const Home = () => (
  <MainLayout>
    <h1>this is home page</h1>
    <AuthPopup />
  </MainLayout>
);

export default Home;

// export default withAuthSync(Home);
