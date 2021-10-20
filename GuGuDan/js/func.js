const React = require("react");

const GuGuDan = () => {
  const [num1, setNum1] = React.useState(Math.ceil(Math.random() * 9));
  const [num2, setNum2] = React.useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = React.useState("");
  const [result, setResult] = React.useState("");
  const inputRef = React.useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value == num1 * num2) {
      setNum1(Math.ceil(Math.random() * 9));
      setNum2(Math.ceil(Math.random() * 9));
      setValue("");
      setResult("정답 : " + value);
    } else {
      setValue("");
      setResult("땡 : " + value);
    }
    inputRef.current.focus();
  };

  return (
    <React.Fragment>
      <div>
        {num1} X {num2} = ?
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="number"
          value={value}
          onChange={handleChange}
        />
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
    </React.Fragment>
  );
};

module.exports = GuGuDan;
