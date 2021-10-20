import React, { PureComponent } from 'react';
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

class LottoClass extends PureComponent {
  state = {
    numbers: getNumbers(),
    balls: [],
    bonus: null,
    redo: false
  }

  timeout=[];

  playLotto = () => {
    console.log('playLotto');
    const { numbers } = this.state;
    for(let i=0; i < numbers.length -1; i++) {
      this.timeout[i] = setTimeout(() => {
        this.setState(prevState => ({
          balls: [...prevState.balls, numbers[i]]
        }))
      }, (i+1)*1000)
    };
    this.timeout[numbers.length-1] = setTimeout(() => {
      this.setState(prevState => ({ 
        bonus: prevState.numbers[numbers.length-1], 
        redo: true
      }))
    }, 7000);
  }

  componentDidMount() {
    this.playLotto();
  }

  componentDidUpdate() {
    if(this.state.balls.length === 0) {
      this.playLotto();
    }
  }

  componentWillUnmount() {
    this.timeout.forEach(item => clearTimeout(item))
  }


  handleClick = () => {
    this.setState({
      numbers: getNumbers(),
      balls: [],
      bonus: null,
      redo: false
    })
  }

  render() {
    const { balls, bonus, redo } = this.state;
    return (
      <>
        <p>로또 추첨</p>
        { balls.map(item => <Ball key={item} number={item} />)}
        <p>보너스</p>
        { bonus && <Ball number={ bonus } />}
        { redo && <button onClick={this.handleClick}>다시하기</button>}
      </>
    );
  }
}

export default LottoClass;