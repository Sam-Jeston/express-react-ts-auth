import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import 'bulma/bulma.sass'
import './style.scss'

/// <reference path="./interfaces.d.ts" />

ReactDOM.render(
    <App />,
    document.getElementById("example")
);
