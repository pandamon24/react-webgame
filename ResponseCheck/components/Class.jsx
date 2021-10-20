import React, { Component } from 'react';

class ResponseCheckClass extends Component {
  state = {
    state: 'waiting',
    message: '시작하려면 클릭하세요.',
    avgSpeed: [],
  }

  timeout;
  startTime;
  endTime;

  handleClick = () => {
    const { state } = this.state;
    
    if( state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요.'
      })
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '클릭하세요.'
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000)
    } else if( state === 'ready') {
      this.setState({
        state: 'waiting',
        message: '너무 빨리 클릭했습니다. 초록색이 되면 클릭하세요.'
      });
      clearTimeout(this.timeout);
    } else if( state === 'now') {
      this.endTime = new Date();
      this.setState(prevState => ({
        state: 'waiting',
        message: '시작하려면 클릭하세요.',
        avgSpeed: [...prevState.avgSpeed, this.endTime - this.startTime]
      }))
    }
  }

  handleReset = () => {
    this.setState({
      avgSpeed: []
    })
  }
  
  render() {
    const { state, message, avgSpeed } = this.state;
    return (
      <>
        <div id="box" className={state} onClick={this.handleClick}>
          { message }
        </div>
        { avgSpeed.length !== 0 && (
          <>
            <span>평균 속도: {avgSpeed.reduce((final, value) => value + final)/avgSpeed.length}ms</span>
            <button onClick={this.handleReset}>리셋</button>
          </>
        )}
      </>
    );
  }
}

export default ResponseCheckClass;