import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  width: 50px;
  height: 100%;
  cursor: pointer;
  :hover {
    background-color: #d0d2d5;

  }
  :hover:before {
    border: 1px solid black;
    background-color: #d0d2d5;
  }
  :before {
    display: block;
    position: absolute;
    top: 7px;
    left: 19px;
    width: 11px;
    height: 11px;
    content: '';
    border: 1px solid #8b8d8f;
    background-color: #e7eaed;
  }
`;

const ExpandButton = ({ onClick }) => <Button onClick={onClick} />;

export default ExpandButton;
