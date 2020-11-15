import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Repositories from "./components/Repositories";
import Details from "./components/Details";

import "./App.css";

function App() {
  return (
    <div className="mainContainer">
      <Details />
      <Repositories />
    </div>
  );
}

export default App;
