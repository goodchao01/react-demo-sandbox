import React, { Suspense } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Home = React.lazy(() => import("../views/Home"));
const Demo = React.lazy(() => import("../views/Demo"));

export default function RouterConfig() {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Switch>
          <Route exact key="Home" path="/" component={Home} />
          <Route exact key="Demo" path="/Demo" component={Demo} />
        </Switch>
      </Router>
    </Suspense>
  );
}
