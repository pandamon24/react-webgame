import React, { PureComponent } from 'react';
import AnswerListClass from './AnswerListClass';

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

class NumberBaseballClass extends PureComponent {
  state = {
    value: '',
    result: '시작',
    answer: makeAnswerNumber(),
    tries: [],
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.answer)
    const { answer, value, tries, result } = this.state
    if (answer.join('') == value) {
      this.setState(prevState => ({
        value: '',
        result: '홈런',
        tries: [...prevState.tries, {try: value, result: '홈런'}]
      }));
      setTimeout(() => {
        alert('홈런!! 게임 다시하기');
        this.setState({
          value: '',
          result: '시작',
          answer: makeAnswerNumber(),
          tries: [],
        });
      }, 500)
    } else {
      if(tries.length >= 9) {
        this.setState({ result: '기회 10번을 모두 사용하였습니다. 정답은' + answer.join('') + '입니다.'});
        setTimeout(() => {
          alert('게임 다시하기');
          this.setState({
            value: '',
            result: '시작',
            answer: makeAnswerNumber(),
            tries: [],
          });
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
        this.setState((prevState) => ({
          value: '',
          result: `스트라이크: ${strike} 볼: ${ball}`,
          tries: [...prevState.tries, { try: value, result: `스트라이크: ${strike} 볼: ${ball}` }]
        }))
      }
    }
  }
  
  render() {
    const { value, result, tries } = this.state;

    return (
      <>
        <div>{result}</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" maxLength="4" pattern="[0-9]{4}" value={value} onChange={this.handleChange} />
          <button type="submit">입력</button>
        </form>
        <ul>
          { tries && tries.map((value, i) => <AnswerListClass key={`${i}차 시도`} value={value} />)}
        </ul>
      </>
    );
  }
}

export default NumberBaseballClass;