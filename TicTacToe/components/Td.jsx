import React, { memo, useCallback } from 'react';
import { CHANGE_TABLEDATA } from './TicTacToe';

const Td = ({ rowIndex, colIndex, colData, dispatch }) => {

  const handleClick = useCallback(()=> {
    if(colData) { // 데이터가 있으면 dispatch 수행 x
      return
    }
    dispatch({type: CHANGE_TABLEDATA, row: rowIndex, col: colIndex});
  }, [colData])
  return (
    <td onClick={handleClick}>{colData}</td>
  );
};

export default memo(Td);