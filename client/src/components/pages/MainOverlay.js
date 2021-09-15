import React from "react";
import styled from "styled-components";
import OverlayModel from "../abstract/OverlayModel";
import map from "../../../../arts/map.json";
import map1 from "../../../../arts/map1.json";
import OverlayMenu from "../abstract/OverlayMenu";
import {isEmpty} from "../../tools/utils";
import MainOverlayCard from "../abstract/MainOverlayCard";

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
`

const Card = styled.div`
  height: 50px;
  margin: 10px;
  margin-bottom: 0;
  background-color: #f1f3f4;
  color: #777;
  font-weight: bold;
`

class MainOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.defaultSettings = {
      width: 900,
      height: 900,
      top: 20,
      left: 1000,
      full: false
    }
    this.state = {
      data: {},
      selectValue: '',
      buttonValue: ''
    }
  }

  componentDidMount() {
    this.setState({data: {map, map1}});
  }

  render = () => {
    const {data, selectValue, buttonValue} = this.state;
    if (isEmpty(data)) {
      return null;
    }
    return <OverlayModel
        name={'MAIN'}
        defaultSettings={this.defaultSettings}
        menu={<OverlayMenu data={data} callback={this._menuCallback}/>}
    >
      {selectValue && buttonValue
      ? <InnerWrapper>
            {Object.entries(data[selectValue][buttonValue]).map(([key, value], index) => {
              return <MainOverlayCard title={key} data={value}/>;
            })}
          </InnerWrapper>
      : null}

      </OverlayModel>;
  }

  _menuCallback = (data) => {
    this.setState(data);
  }

}

export default MainOverlay;
