import React from 'react';

// @ts-ignore
function TextError(props) {
  return (
    <small
      style={{
        color: 'red',
        fontSize: 14,
        fontFamily: "'Open Sans', sans-serif",
        marginTop: 10,
      }}
    >
      {props.children}
    </small>
  );
}

export default TextError;
