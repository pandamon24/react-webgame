import React, { useCallback, useContext } from 'react';
import { IS_WIN, OPEN_BLOCK, SETTING_NUMBERS, SET_FLAG, SET_INIT, SET_QUESTION, TableContext } from './MineSearch';

const Td = ({rowIndex, colIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const data = tableData[rowIndex][colIndex];
  
  const setText = useCallback(() => {
    if(data > 0) {
      return data;
    }
    if(data === SETTING_NUMBERS.normal) {
      return null;
    } else if(data ===  SETTING_NUMBERS.mine) {
      return 'X';
    }
    // return data
  }, [data])

  const setStyle = useCallback(() => {
    if(data >= 0) {
      return '#fff'
    }
    if(data === SETTING_NUMBERS.normal || data ===  SETTING_NUMBERS.mine) {
      return '#444'
    } else if(data === SETTING_NUMBERS.flag || data === SETTING_NUMBERS.mine_flag) {
      return 'yellow'
    } else if(data === SETTING_NUMBERS.question || data === SETTING_NUMBERS.mine_question) {
      return 'orange'
    }
  }, [data])

  const handleClick = useCallback((row, col) => () => {
    if(halted) {
      return;
    }
    dispatch({ type: OPEN_BLOCK, row, col });
    dispatch({ type: IS_WIN })
  }, [])

  const handleContextMenu = (e) => {
    e.preventDefault();
    if(data === SETTING_NUMBERS.normal ||  data ===  SETTING_NUMBERS.mine) {
      dispatch({ type: SET_FLAG, row: rowIndex, col: colIndex});
    } else if(data === SETTING_NUMBERS.flag ||  data ===  SETTING_NUMBERS.mine_flag) {
      dispatch({ type: SET_QUESTION, row: rowIndex, col: colIndex});
    } else if(data === SETTING_NUMBERS.question || data === SETTING_NUMBERS.mine_question) {
      dispatch({ type: SET_INIT, row: rowIndex, col: colIndex});
    }
  }

  return (
    <td style={{background: setStyle()}} onClick={handleClick(rowIndex, colIndex)} onContextMenu={handleContextMenu}>
      {setText()}
    </td>
  );
};

export default Td;