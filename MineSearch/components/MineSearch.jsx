import React, { createContext, useReducer } from 'react';
import Form from './Form';
import Table from './Table';

export const TABLE_SETTING = 'TABLE_SETTING';
export const OPEN_BLOCK = 'OPEN_BLOCK';
export const SET_FLAG = "SET_FLAG";
export const SET_QUESTION = "SET_QUESTION";
export const SET_INIT = "SET_INIT";
export const OPEN_NORMAL = "OPEN_NORMAL";
export const IS_WIN = "IS_WIN";

export const SETTING_NUMBERS = {
  mine: -7,
  normal: -1,
  flag: -2,
  mine_flag: -3,
  question: -4,
  mine_question: -5,
}

function setting_table(row, col, mine) {
  const table = Array(row).fill().map((rowItem, i) => Array(col).fill().map((colItem, j) => (i * col) + j));
  const candidate = Array(row * col).fill().map((item, i) => i);
  const suffle = [];
  for(let i=0; i < mine; i++) {
    suffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const realTable = table.map((rowItem, i) => rowItem.map((colItem, j) => suffle.includes(colItem) ? SETTING_NUMBERS.mine : SETTING_NUMBERS.normal));
  return realTable;
}

const initState = {
  tableData: setting_table(10, 10, 20),
  halted: false,
  result: '',
  normalBlock: 0,
  value: {
    row: 10,
    col: 10,
    mine: 20,
  }
}

const reducer = (state, action) => {
  switch(action.type) {
    case TABLE_SETTING: {
      const { row, col, mine } = action;
      return {
        ...state,
        tableData: setting_table(row, col, mine),
        result: '',
        normalBlock: 0,
        hatled: false,
        value: {
          row,
          col,
          mine
        }
      }
    }
    case OPEN_BLOCK: {
      const { row, col } = action;
      const tableData = [...state.tableData];
      tableData[row] = [...state.tableData[row]];
    
      if(tableData[row][col] === SETTING_NUMBERS.mine) {
        return {
          ...state,
          halted: true,
          result: '실패'
        }
      } else if(tableData[row][col] === SETTING_NUMBERS.normal) {
        const getMineNumber = (row, col) => {
          let count;
          const around = [];
          if(row -1 >= 0) {
            around.push(tableData[row-1][col]);
            if(col - 1 >= 0) {
              around.push(tableData[row-1][col-1]);
            };
            if(col + 1 < tableData[row-1].length) {
              around.push(tableData[row-1][col+1]);
            };
          };
          if(col - 1 >= 0) {
            around.push(tableData[row][col-1]);
          };
          if(col + 1 < tableData[row].length) {
            around.push(tableData[row][col+1]);
          };
          if(row + 1 < tableData.length) {
            around.push(tableData[row+1][col]);
            if(col - 1 >= 0) {
              around.push(tableData[row+1][col-1]);
            };
            if(col + 1 < tableData[row+1].length) {
              around.push(tableData[row+1][col+1]);
            };
          };
          count = around.filter(item => [SETTING_NUMBERS.mine, SETTING_NUMBERS.mine_flag, SETTING_NUMBERS.mine_question].includes(item)).length;
          tableData[row][col] = count;
          if(tableData[row][col] === 0) {
            const near = [];
            if(row -1 >= 0) {
              near.push([row-1,col]);
              if(col - 1 >= 0) {
                near.push([row-1,col-1]);
              };
              if(col + 1 < tableData[row-1].length) {
                near.push([row-1,col+1]);
              };
            };
            if(col - 1 >= 0) {
              near.push([row, col-1]);
            };
            if(col + 1 < tableData[row].length) {
              near.push([row, col+1]);
            };
            if(row + 1 < tableData.length) {
              near.push([row+1,col]);
              if(col - 1 >= 0) {
                near.push([row+1,col-1]);
              };
              if(col + 1 < tableData[row+1].length) {
                near.push([row+1,col+1]);
              };
            };
            near.forEach((item) => {
              if(tableData[item[0]][[item[1]]] < 0) {
                getMineNumber(item[0], item[1]);
                state.normalBlock += 1;
              }
            });
          }
        };
        getMineNumber(row, col);
        // console.log(state.normalBlock);
        return {
          ...state,
          tableData,
          normalBlock: state.normalBlock+1,
        }
      } else {
        return {
          ...state,
          tableData,
        }
      }
    }
    case SET_FLAG: {
      const { row, col } = action;
      const tableData = [...state.tableData];
      tableData[row] = [...state.tableData[row]];
    
      if(tableData[row][col] === SETTING_NUMBERS.normal) {
        tableData[row][col] = SETTING_NUMBERS.flag;
      } else {
        tableData[row][col] = SETTING_NUMBERS.mine_flag;
      }
      return {
        ...state,
        tableData
      }
    }
    case SET_QUESTION: { 
      const { row, col } = action;
      const tableData = [...state.tableData];
      tableData[row] = [...state.tableData[row]];
    
      if(tableData[row][col] === SETTING_NUMBERS.flag) {
        tableData[row][col] = SETTING_NUMBERS.question;
      } else {
        tableData[row][col] = SETTING_NUMBERS.mine_question;
      }
      return {
        ...state,
        tableData
      }
    }
    case SET_INIT: {
      const { row, col } = action;
      const tableData = [...state.tableData];
      tableData[row] = [...state.tableData[row]];
    
      if(tableData[row][col] === SETTING_NUMBERS.question) {
        tableData[row][col] = SETTING_NUMBERS.normal;
      } else {
        tableData[row][col] = SETTING_NUMBERS.mine;
      }
      return {
        ...state,
        tableData
      }
    }
    case IS_WIN: {
      const { normalBlock } = state;
      const { row, col, mine } = state.value;
      if(normalBlock === row * col - mine) {
        return {
          ...state,
          hatled: true,
          result: '성공'
        }
      }
    }
    default: {
      return state
    }
  }
}

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: false,
})

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer, initState);
  const { tableData, halted, result } = state;

  return (
    <TableContext.Provider value={{tableData, dispatch, halted}}>
      <Form />
      <Table />
      { result && <div>{result}</div>}
    </TableContext.Provider>
  );
};

export default MineSearch;