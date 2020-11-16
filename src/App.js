import React, { Fragment } from "react";

import Repositories from "./components/Repositories";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <Fragment>
      <Navbar />
      <div className="mainContainer">
        <Repositories />
      </div>
    </Fragment>
  );
}

export default App;
