import React from 'react';
import Td from './Td';

const Tr = ({ rowIndex, rowData }) => {
  return (
    <tr>
      { rowData && rowData.map((col, i) => <Td key={i} colIndex={i} rowIndex={rowIndex}/>)}
    </tr>
  );
};

export default Tr;