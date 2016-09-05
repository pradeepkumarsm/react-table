import React from "react";
import {render} from "react-dom";

import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router';


import Basic from "./pages/Basic";
import HomePage from "./pages/HomePage";
import notFound from './pages/NotFound';


render(
    <Router history={browserHistory}>
        <Route path="/" component={HomePage}>
            <Route path="basic" component={Basic}/>
            <Route path="*" component={notFound}/>
        </Route>
    </Router>,
    document.getElementById("app")
);