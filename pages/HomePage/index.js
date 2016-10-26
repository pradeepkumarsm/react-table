import React from 'react';
import {Link} from 'react-router';
import design from './homepage-design.css';

export default (props) => {
    return (
        <div>
            <div className={design["links"]}>
                <Link to="basic"> Demo </Link>
                <Link to="sorting"> Sorting </Link>
                <Link to="nested"> Nested Table </Link>
                <Link to="async"> Async Data Table </Link>
            </div>
            {props.children}
        </div>
    )
}

