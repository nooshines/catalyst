import React, { Fragment } from "react";

import Repositories from "./components/Repositories";
import Details from "./components/Details";

import "./App.css";

function App() {
  return (
    <Fragment>
      <Details />
      <div className="mainContainer">
        <Repositories />
      </div>
    </Fragment>
  );
}

export default App;
