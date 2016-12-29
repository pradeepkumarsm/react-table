import React from 'react';


export default (props) => {
  const {onSelectAll, selectAll} = props;

  return (
    <input type="checkbox" onClick = {onSelectAll} checked={selectAll}/>
  )
}