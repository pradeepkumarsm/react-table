import React from 'react';


export default (props) => {
  const {rowOnChange, parentProperties, data, selectedRows} = props;
  const {keyForRowSelect, rawData} = parentProperties;

  const selectCurrentRow = selectedRows && selectedRows[data[keyForRowSelect]] ? true : false;

  return (
    <div>
      {selectCurrentRow ? <input type="button" value="text"/> : <input type="text" defaultValue="text"/> }
    </div>
  )
}