const React = require('react');
const ReactDom = require('react-dom');
const GuGuDanCL = require('./js/class');
const GuGuDan = require('./js/func')

ReactDom.render(<div><GuGuDanCL /><GuGuDan /></div>, document.querySelector("#root"));
