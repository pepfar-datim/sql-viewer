import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ViewData from "./Data/ViewData";
import Layout from "./Layout";
import SelectQuery from "./Selection/SelectQuery";

const Main = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/view/:id" component={ViewData} />
          <Route>
            <Layout>
              <SelectQuery />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Main;
