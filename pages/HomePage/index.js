import React from 'react';
import {Link} from 'react-router';

export default (props) => {
    return (
        <div>
            <Link to="basic"> Example1 </Link>
            {props.children}
        </div>
    )
}

