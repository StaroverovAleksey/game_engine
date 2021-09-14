import React, {useState} from 'react';
import styled from 'styled-components';

const Corner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: -8px;
  right: -8px;
  border-top: 1px solid #989898;
  background-color: #e7eaed;
  transform: rotate(-45deg);
  cursor: se-resize;
`;

const ExpandCorner = ({ resize, endResize }) => {
  let startX = 0;
  let startY = 0;
  const _mouseUpHandler = () => {
    startX = 0;
    startY = 0;
    endResize();
    window.removeEventListener('mousemove', _mouseMoveHandler);
    window.removeEventListener('mouseup', _mouseUpHandler);
  };

  const _mouseMoveHandler = (event) => {
    event.preventDefault();
    resize(event.clientX - startX, event.clientY - startY);
    startX = event.clientX; startY = event.clientY;
  };

  const _mouseDownHandler = (event) => {
    startX = event.clientX; startY = event.clientY;
    window.addEventListener('mousemove', _mouseMoveHandler);
    window.addEventListener('mouseup', _mouseUpHandler);
  };
  return <Corner onMouseDown={_mouseDownHandler}/>;
};

export default ExpandCorner;
