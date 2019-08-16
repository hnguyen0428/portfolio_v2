import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import MobileHome from './mobile/Home';
import DesktopHome from './desktop/Home';
import {isMobileOnly} from 'react-device-detect';
import * as serviceWorker from './serviceWorker';
import {Route, HashRouter} from "react-router-dom";
import history from "./desktop/history";
import Login from "./desktop/Login";


if (isMobileOnly) {
  ReactDOM.render(<MobileHome/>, document.getElementById('root'));
} else {
  ReactDOM.render(
    <HashRouter history={history}>
      <Route exact path={"/"} component={DesktopHome}/>
      <Route exact path={"/login"} component={Login}/>
    </HashRouter>,
    document.getElementById('root')
  );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
