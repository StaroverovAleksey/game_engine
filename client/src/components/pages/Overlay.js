import React from "react";
import styled from "styled-components";
import OverlayModel from "../abstract/OverlayModel";

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 100;
`

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.defaultSettings = {
      width: 900,
      height: 900,
      top: 20,
      left: 1000,
      full: false
    }
  }

  render = () => {
    return <OverlayModel name={'MAIN'} defaultSettings={this.defaultSettings}>
        <InnerWrapper/>
      </OverlayModel>;
  }

}

export default Overlay;
