import React from 'react';
import Tr from './Tr';

const Table = ({tableData, dispatch}) => {
  return (
    <>
      <table>
        <tbody>
        { tableData.map((item, i) => <Tr key={i} rowData={item} rowIndex={i} dispatch={dispatch} />)}
        </tbody>
      </table>
    </>
  );
};

export default Table;