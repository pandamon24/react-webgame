import React, { useCallback, useContext, useState } from 'react';
import { TableContext, TABLE_SETTING } from './MineSearch';

const Form = () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, [])
  
  const onChangeCol = useCallback((e) => {
    setCol(e.target.value);
  }, [])

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log(row, col, mine)
    dispatch({ type: TABLE_SETTING, row: Number(row), col: Number(col), mine: Number(mine)})
  }, [row, col, mine])

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="row">가로줄 수: </label>
      <input type="number" id="row" value={row} onChange={onChangeRow} />
      <label htmlFor="col">세로줄 수: </label>
      <input type="number" id="col" value={col} onChange={onChangeCol} />
      <label htmlFor="mine">지뢰 개수: </label>
      <input type="number" id="mine" value={mine} onChange={onChangeMine} />
      <button type="submit">시작!!</button>
    </form>
  );
};

export default Form;