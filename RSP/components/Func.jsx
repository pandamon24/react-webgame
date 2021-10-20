import React, { Component, useEffect, useRef, useState } from 'react';

const imgCoordX = {
  바위: '0',
  가위: '-290px',
  보: '-600px'
}

const RSPscore = {
  바위: 1,
  가위: 0,
  보: -1
}


const RCPFunc = () => {

  const [ posX, setPosX ] = useState(imgCoordX.바위);
  const [ result, setResult ] = useState('');
  const [ score, setScore ] = useState(0);

  const interval = useRef(null);
  const timeout = useRef(null);

  const changeHand = () => {
    return setInterval(() => {
      if( posX === imgCoordX.바위) {
        setPosX(imgCoordX.가위)
      } else if( posX === imgCoordX.가위) {
        setPosX(imgCoordX.보)
      } else {
        setPosX(imgCoordX.바위)
      }
    }, 100);
  }

  useEffect(() => {
    interval.current = changeHand();
    return () => clearInterval(interval.current);
  }, [posX])

  const handleClick = (choice) =>  () => {
    if(interval.current || timecout.current) {
      clearInterval(interval.current);
      clearTimeout(timeout.current);

      const computerState = Object.entries(imgCoordX).filter(item => item[1] === posX)[0];
      const computerScore = RSPscore[computerState[0]];
      const myScore = RSPscore[choice];
      const diff = computerScore - myScore
      if( diff === 0) {
        setResult('비겼습니다.');
      } else if([-1, 2].includes(diff)) {
        setResult('이겼습니다!!!');
        setScore(prevScore => prevScore + 1);
      } else {
        setResult('졌습니다. ㅜㅜ');
        setScore(prevScore => prevScore - 1);
      }
      timeout.current = setTimeout(() => interval.current = changeHand(), 1000)
    } 
  }

  return (
    <>
      <div className='rcpImage' style={{ backgroundPosition: `${posX} 0px`}}></div>
      <button onClick={handleClick('바위')}>바위</button>
      <button onClick={handleClick('가위')}>가위</button>
      <button onClick={handleClick('보')}>보</button>
      <div>{result}</div>
      <div>점수 : {score}</div>
    </>
  );
}

export default RCPFunc;