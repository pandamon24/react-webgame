import React, { Component } from 'react';

const imgCoordX = {
  바위: '0',
  가위: '-290px',
  보: '-600px'
}

const score = {
  바위: 1,
  가위: 0,
  보: -1
}


class RCPClass extends Component {
  state = {
    posX: imgCoordX.바위,
    result: '',
    score: 0
  }

  interval;
  timeout;

  changeHand = () => {
    return setInterval(() => {
      const { posX } = this.state;
      if( posX === imgCoordX.바위) {
        this.setState({ posX: imgCoordX.가위 })
      } else if( posX === imgCoordX.가위) {
        this.setState({ posX: imgCoordX.보 })
      } else {
        this.setState({ posX: imgCoordX.바위 })
      }
    }, 100);
  }

  componentDidMount() {
    this.interval = this.changeHand();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleClick = (choice) => () => {
    if(this.interval || this.timecout) {
      clearInterval(this.interval);
      clearTimeout(this.timeout);

      const { posX } = this.state;
      const computerState = Object.entries(imgCoordX).filter(item => item[1] === posX)[0];
      const computerScore = score[computerState[0]];
      const myScore = score[choice];
      const diff = computerScore - myScore
      if( diff === 0) {
        this.setState({
          result: '비겼습니다.'
        });
      } else if([-1, 2].includes(diff)) {
        this.setState(prevState => ({
          result: '이겼습니다!!!!',
          score: prevState.score + 1
        }));
      } else {
        this.setState(prevState => ({
          result: '졌습니다. ㅜㅜ',
          score: prevState.score - 1
        }));
      }
      this.timeout = setTimeout(() => this.interval=this.changeHand(), 1000)
    } 
  }

  render() {
    const { posX, result, score } = this.state;

    return (
      <>
        <div className='rcpImage' style={{ backgroundPosition: `${posX} 0px`}}></div>
        <button onClick={this.handleClick('바위')}>바위</button>
        <button onClick={this.handleClick('가위')}>가위</button>
        <button onClick={this.handleClick('보')}>보</button>
        <div>{result}</div>
        <div>점수 : {score}</div>
      </>
    );
  }
}

export default RCPClass;