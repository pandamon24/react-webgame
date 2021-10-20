import React, { useRef, useState } from 'react';

const ResponseCheckFunc = () => {

  const [ state, setState ] = useState('waiting');
  const [ message, setMessage ] = useState('시작하려면 클릭하세요.');
  const [ avgSpeed, setAvgSpeed ] = useState([]);

  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const handleClick = () => {    
    if( state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.')
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('클릭하세요.');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000)
    } else if( state === 'ready') {
      setState('waiting');
      setMessage('너무 빨리 클릭했습니다. 초록색이 되면 클릭하세요.')
      clearTimeout(timeout.current);
    } else if( state === 'now') {
      endTime.current = new Date();
      setState('waiting');
      setMessage('시작하려면 클릭하세요.');
      setAvgSpeed(prevSpeed => [...prevSpeed, endTime.current - startTime.current]);
    }
  }

  const handleReset = () => {
    setAvgSpeed([]);
  }
  
  return (
    <>
      <div id="box" className={state} onClick={handleClick}>
        { message }
      </div>
      { avgSpeed.length !== 0 && (
        <>
          <span>평균 속도: {avgSpeed.reduce((final, value) => value + final)/avgSpeed.length}ms</span>
          <button onClick={handleReset}>리셋</button>
        </>
      )}
    </>
  );
}

export default ResponseCheckFunc;