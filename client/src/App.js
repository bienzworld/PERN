import React, { Fragment } from "react";
import "./App.css";

//components

import InputQuery from "./components/InputQuery";
import ListQuery from "./components/ListQuery";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputQuery />
        <ListQuery />
      </div>
    </Fragment>
  );
}

export default App;
