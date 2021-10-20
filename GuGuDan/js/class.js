const React = require("react");

class GuGuDanCL extends React.Component {
  state = {
    num1: Math.ceil(Math.random() * 9),
    num2: Math.ceil(Math.random() * 9),
    value: "",
    result: "",
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = (e) => {
    const { num1, num2, value } = this.state;
    e.preventDefault();
    if (value == num1 * num2) {
      this.setState((prevState) => ({
        num1: Math.ceil(Math.random() * 9),
        num2: Math.ceil(Math.random() * 9),
        value: "",
        result: "정답 : " + prevState.value,
      }));
    } else {
      this.setState((prevState) => ({
        value: "",
        result: "땡 : " + prevState.value,
      }));
    }
    this.ref.focus();
  };

  setRef = (ref) => {
    this.ref = ref;
  };

  componentDidMount() {
    this.ref.focus();
  }

  render() {
    const { num1, num2, value, result } = this.state;

    return (
      <React.Fragment>
        <div>
          {num1} X {num2} = ?
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={this.setRef}
            type="number"
            value={value}
            onChange={this.handleChange}
          />
          <button type="submit">입력</button>
        </form>
        <div>{result}</div>
      </React.Fragment>
    );
  }
}

module.exports = GuGuDanCL;
