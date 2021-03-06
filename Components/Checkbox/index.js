import React from 'react';


export default (props) => {
  const {rowOnChange, parentProperties, data, selectedRows} = props;
  const {keyForRowSelect, rawData} = parentProperties;
  const selectCurrentRow = selectedRows && selectedRows[data[keyForRowSelect]] ? true : false;

  return (
    <input type="checkbox" onClick = {rowOnChange} checked={selectCurrentRow}/>
  )
}