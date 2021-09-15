import React from 'react';
import styled from 'styled-components';

const Button = styled.div`
  position: relative;
  width: 50px;
  height: 100%;
  cursor: pointer;
  :hover {
    background-color: #e81123;

  }
  :hover:before, :hover:after {
    background-color: white;

  }
  :before {
    display: block;
    position: absolute;
    top: 6px;
    left: 25px;
    content: '';
    background-color: #8b8d8f;
    width: 1px;
    height: 16px;
    transform: rotate(-45deg);
  }
  :after {
    display: block;
    position: absolute;
    top: 6px;
    left: 25px;
    content: '';
    background-color: #8b8d8f;
    width: 1px;
    height: 16px;
    transform: rotate(45deg);
  }
`;

const CloseButton = ({ onClick }) => <Button onClick={onClick} />;

export default CloseButton;
