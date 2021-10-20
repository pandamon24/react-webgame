import React, { Component } from 'react';

class WordRelayClass extends Component {
  state = {
    word: '은영',
    result: '',
    value: '',
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    const { word, value } = this.state;
    if( word[word.length - 1] == value[0]) {
      this.setState({
        word: value,
        result: '딩동댕',
        value: '',
      })
    } else {
      this.setState({
        result: '땡',
        value: '',
      })
    }
  }

  render() {
    const { word, result, value } = this.state;
    return (
      <>
        <div>{ word }</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={value} onChange={this.handleChange} />
          <button type="submit">입력</button>
        </form>
        <div>{result}</div>
      </>
    );
  }
}

export default WordRelayClass;