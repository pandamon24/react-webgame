import React from "react";
import ReactDOM from "react-dom";
import ResponseCheckClass from "./components/Class";
import ResponseCheckFunc from "./components/Func";

ReactDOM.render(
  <>
    <ResponseCheckClass />
    <ResponseCheckFunc />
  </>,
  document.querySelector("#root")
);
