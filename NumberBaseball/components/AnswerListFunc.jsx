import React, { memo } from 'react';

const AnswerListClass = ({value}) => {
  return (
    <li>
      {value.try} - {value.result}
    </li>
  );
}

export default memo(AnswerListClass);