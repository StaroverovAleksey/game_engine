import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  width: 40px;
  height: 100%;
  cursor: pointer;
  :hover {
    background-color: #d0d2d5;

  }
  :hover:before, :hover:after {
    border: 1px solid black;
    background-color: #d0d2d5;
  }
  :before {
    display: block;
    position: absolute;
    top: 5px;
    left: 17px;
    width: 9px;
    height: 9px;
    content: '';
    border: 1px solid #8b8d8f;
    background-color: #e7eaed;
  }
  :after {
    display: block;
    position: absolute;
    top: 8px;
    left: 14px;
    width: 9px;
    height: 9px;
    content: '';
    border: 1px solid #8b8d8f;
    background-color: #e7eaed;
  }
`;

const ExpandButton = ({ onClick }) => <Button onClick={onClick} />;

export default ExpandButton;
