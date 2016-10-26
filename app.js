import React from "react";
import {render} from "react-dom";

import {Router, Route, browserHistory, IndexRoute, Link} from 'react-router';


import Basic from "./pages/Basic";
import HomePage from "./pages/HomePage";
import notFound from './pages/NotFound';
import Sorting from "./pages/Sorting";
import Nested from "./pages/Nested";
import Async from './pages/Async';


render(
    <Router history={browserHistory}>
        <Route path="/" component={HomePage}>
            <Route path="basic" component={Basic}/>
            <Route path="sorting" component={Sorting}/>
            <Route path="nested" component={Nested}/>
            <Route path="async" component={Async}/>
            <Route path="*" component={notFound}/>
        </Route>
    </Router>,
    document.getElementById("app")
);