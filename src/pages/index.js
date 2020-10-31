import React from "react";
// import { withAuthSync } from "../utils/auth";
import AuthDialog from "../../src/components/AuthDialog";
import MainLayout from "../layouts/MainLayout";
const Home = () => (
  <MainLayout>
    <h1>this is home page</h1>
    <AuthDialog isOpen={true} />
  </MainLayout>
);

export default Home;

// export default withAuthSync(Home);
