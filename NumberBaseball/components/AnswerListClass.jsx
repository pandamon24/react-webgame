import React, { PureComponent } from 'react';

class AnswerListClass extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState, nextContexxt){
  //   if(this.props.value !== nextProps.value) {
  //     return true;
  //   }
  //   return false;
  // }
  render() {
    const { try: tried, result } = this.props.value;
    return (
      <li>
        {tried} - {result}
      </li>
    );
  }
}

export default AnswerListClass;