import React from "react";
import styled from "styled-components";
import OverlayModel from "../abstract/OverlayModel";
import OverlayMenu from "../abstract/OverlayMenu";
import MainOverlayCard from "../abstract/MainOverlayCard";
import {connect} from "react-redux";

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: white;
  overflow-y: auto;
`;

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
    this.state = {}
  }

  render = () => {
    const {data} = this.props;
    const {choiceFile, choiceGroup, choiceSubgroup, choiceItem} = this.props.settings;
    return <OverlayModel
        name={'MAIN'}
        defaultSettings={this.defaultSettings}
        closeCallback={this._closeHandler}
        menu={<OverlayMenu/>}
    >
      {choiceFile && choiceGroup
      ? <InnerWrapper>
            {Object.entries(data[choiceFile][choiceGroup]).map(([key, value], index) => {
              return <MainOverlayCard
                  key={`card_${index}`}
                  title={key}
                  data={value}
                  choiceFile={choiceFile}
                  choiceGroup={choiceGroup}
                  choiceSubgroup={choiceSubgroup}
                  choiceItem={choiceItem}
                  callback={this._selectItemHandler}
              />;
            })}
          </InnerWrapper>
      : null}

      </OverlayModel>;
  }

  _selectItemHandler = (event, choiceSubgroup) => {
    const {dispatch} = this.props;
    dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceSubgroup, choiceItem: parseInt(event.target.id)}});
  }

  _closeHandler = () => {
    const {dispatch} = this.props;
    dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceSubgroup: null, choiceItem: null}});
  }

}

export default connect(
    (mapStateToProps) => ({
      settings: mapStateToProps.settings,
      data: mapStateToProps.data
    }),
)(MainOverlay);
