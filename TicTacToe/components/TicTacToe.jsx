import React, { useEffect, useReducer } from 'react';
import Table from './Table';

const initialState = {
  turn: 'O',
  winner: '',
  tableData: [['','',''], ['','',''], ['','','']],
  clickPosition: [-1, -1]
}

export const CHANGE_TURN = 'CHANGE_TURN';
export const CHANGE_TABLEDATA = 'CHANGE_TABLEDATA';
export const GET_WINNER = 'GET_WINNER';
export const RESET = 'RESET';

const reducer = (state, action) => {
  switch(action.type) {
    case CHANGE_TABLEDATA: {
      const { row, col } = action
      const tableData = [...state.tableData];
      tableData[row] = [...tableData[row]]
      tableData[row][col] = state.turn;
      return {
        ...state,
        tableData,
        clickPosition: [row, col]
      }
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      }
    }
    case GET_WINNER: {
      const { winner } = action;
      return {
        ...state,
        winner: winner ? `${winner}가 이겼습니다.` : '무승부입니다.'
      }
    }
    case RESET: {
      return {
        ...state,
        turn: 'O',
        tableData: [['','',''], ['','',''], ['','','']],
        clickPosition: [-1, -1]
      }
    }
    default:
      return state 
  }
}


const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { winner, tableData, clickPosition, turn } = state;

  useEffect(() => {
    const [row, col] = clickPosition;
    if(row < 0) {
      return
    };
    if ((tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn)||
        (tableData[0][col] === turn && tableData[1][col] === turn && tableData[2][col] === turn)||
        (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn)||
        (tableData[0][2] === turn &&tableData[1][1] === turn && tableData[2][0] === turn)) {
      dispatch({ type: GET_WINNER, winner: turn })
      dispatch({type: RESET});
    } else {
      let all = true;
      tableData.forEach(row => row.forEach(col => {
        if(!col) {
          all = false;
        }
      }));
      if(all) {
        dispatch({type: GET_WINNER, winner: null});
        dispatch({type: RESET});
      } else {
        dispatch({type: CHANGE_TURN});
      }
    }
  }, [clickPosition])

  return (
    <>
      <Table tableData={tableData} dispatch={dispatch} />
      { winner && <div>{winner}</div>}
    </>
  );
};

export default TicTacToe;