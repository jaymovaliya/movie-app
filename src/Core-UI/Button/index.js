import React, { memo } from 'react';
import './styles.scss';

function Button(props) {
  return (
    <div className="Button">
      <div className="button-container" onClick={() => props.onClick()}>
        <span className="button-text">{props.text}</span>
      </div>
    </div>
  );
}

export default memo(Button);