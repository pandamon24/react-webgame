import React, { memo } from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, colData, dispatch }) => {
  return (
    <tr>
      { rowData.map((item, i) => <Td key={i} rowIndex={rowIndex} colData={item} colIndex={i} dispatch={dispatch}/>)}
    </tr>
  );
};

export default memo(Tr);