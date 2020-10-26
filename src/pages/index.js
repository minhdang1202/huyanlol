import React from "react";
import { withAuthSync } from "../utils/auth";
import MainLayout from "../layouts/MainLayout";

const Home = () => (
  <MainLayout>
    <h1>this is home page</h1>
  </MainLayout>
);

export default withAuthSync(Home);
