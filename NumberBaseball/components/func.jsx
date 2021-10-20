import React, { Component, useState } from 'react';
import AnswerListFunc from './AnswerListFunc';

function makeAnswerNumber() {
  const answer = []
  const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for(let i=0; i < 4; i++) {
    let getNumber = Math.floor(Math.random() * number.length);
    let popNumber = number.splice(getNumber, 1)
    answer.push(popNumber[0])
  }
  return answer
}

const NumberBaseballFunc = () => {
  const [ value, setValue ] = useState('');
  const [ result, setResult ] = useState('시작');
  const [ answer, setAnswer ] = useState(makeAnswerNumber());
  const [ tries, setTries ] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(answer)

    if (answer.join('') == value) {
      setValue('');
      setResult('홈런');
      setTries(prevTry => [...prevTry, {try: value, result: '홈런'}])

      setTimeout(() => {
        alert('홈런!! 게임 다시하기');
        setValue('');
        setResult('시작');
        setTries([]);
      }, 500)
    } else {
      if(tries.length >= 9) {
        setResult('기회 10번을 모두 사용하였습니다. 정답은' + answer.join('') + '입니다.')
        setTimeout(() => {
          alert('게임 다시하기');
          setValue('');
          setResult('시작');
          setTries([]);
          setAnswer(makeAnswerNumber());
        }, 500)
      }
      else {
        let strike = 0;
        let ball = 0;
        for(let i=0; i < 4; i++) {
          if(answer[i] === parseInt(value[i])) {
            strike += 1;
          } else if(answer.includes(parseInt(value[i]))) {
            ball += 1;
          }
        }
        setValue('');
        setResult(`스트라이크: ${strike} 볼: ${ball}`);
        setTries(prevTry => [...prevTry, { try: value, result: `스트라이크: ${strike} 볼: ${ball}` }])
      }
    }
  }
  
  return (
    <>
      <div>{result}</div>
      <form onSubmit={handleSubmit}>
        <input type="text" maxLength="4" pattern="[0-9]{4}" value={value} onChange={handleChange} />
        <button type="submit">입력</button>
      </form>
      <ul>
        { tries && tries.map((value, i) => <AnswerListFunc key={`${i}차 시도`} value={value} />)}
      </ul>
    </>
  );

}

export default NumberBaseballFunc;