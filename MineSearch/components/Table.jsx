import React, { useContext } from 'react';
import { TableContext } from './MineSearch';
import Tr from './Tr';

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      { tableData && tableData.map((row, i) => <Tr key={i} rowData={row} rowIndex={i}/>)}
    </table>
  );
};

export default Table;