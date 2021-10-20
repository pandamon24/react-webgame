import React, { PureComponent, useEffect, useMemo, useRef, useState } from 'react';
import Ball from './Ball';

function getNumbers() {
  console.log('getNumbers');
  const candidate = Array(45).fill().map((v, i) => i+1);
  const shuffle = [];
  while(candidate.length > 0) {
    shuffle.push(candidate.splice(Math.random()*candidate.length, 1)[0])
  }
  const numbers = shuffle.splice(0, 6).sort((a, b) => a - b);
  const bonus = shuffle[shuffle.length-1];
  return [...numbers, bonus];
}

const LottoFunc = () => {
  const getLottoNumber = useMemo(() => getNumbers(), []);
  const [numbers, setNumbers] = useState(getLottoNumber);
  const [balls, setBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeout = useRef([]);

  const playLotto = () => {
    console.log('playLotto');
    for(let i=0; i < numbers.length -1; i++) {
      timeout.current[i] = setTimeout(() => {
        setBalls(prevBalls => [...prevBalls, numbers[i]])
      }, (i+1)*1000)
    };
    timeout.current[numbers.length-1] = setTimeout(() => {
      setBonus(numbers[numbers.length -1]);
      setRedo(true);
    }, 7000);
  }

  useEffect(() => {
    playLotto();
    return () => {
      timeout.current.forEach(item => clearTimeout(item));
    }
  }, [timeout.current])

  const handleClick = () => {
    setNumbers(getNumbers());
    setBalls([]);
    setBonus(null);
    setRedo(false);
    timeout.current = [];
  }

  return (
    <>
      <p>로또 추첨</p>
      { balls.map(item => <Ball key={ item } number={ item } />)}
      <p>보너스</p>
      { bonus && <Ball number={ bonus } />}
      { redo && <button onClick={handleClick}>다시하기</button>}
    </>
  );
}

export default LottoFunc;