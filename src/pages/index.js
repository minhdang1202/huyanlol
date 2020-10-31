import React from "react";
// import { withAuthSync } from "../utils/auth";
import MainLayout from "../layouts/MainLayout";
import AuthDialog from "../../src/components/AuthDialog";
const Home = () => (
  <MainLayout>
    <h1>this is home page</h1>
    <AuthDialog isOpen={true} />
  </MainLayout>
);

export default Home;

// export default withAuthSync(Home);
