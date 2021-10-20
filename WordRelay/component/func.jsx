import React, { useState } from "react";

const WordRelayFunc = () => {
  const [ word, setWord ] = useState('은영');
  const [ result, setResult ] = useState('');
  const [ value, setValue ] = useState('');

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault();

    if( word[word.length - 1] == value[0]) {
      setWord(value);
      setResult('딩동댕');
      setValue('');
    } else {
      setResult('땡');
      setValue('');
    }
  }

  return (
    <>
      <div>{ word }</div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={value} onChange={handleChange} />
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

export default WordRelayFunc;