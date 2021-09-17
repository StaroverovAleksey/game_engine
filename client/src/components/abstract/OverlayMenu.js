import React from 'react';
import styled from 'styled-components';
import {connect} from "react-redux";
import {isEmpty} from "../../tools/utils";

const Menu = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: #f1f3f4;
  cursor: pointer;
`;

const Select = styled.select`
  min-width: 100px;
  margin-right: 3px;
`;

const Button = styled.button`
  min-width: 80px;
  height: 100%;
  background-color: #f1f3f4;
  box-sizing: border-box;
  cursor: pointer;
  border: none;
  border-bottom: ${({selected}) => selected ? '1px solid #1a73e8' : 'none'};
  padding-top: ${({selected}) => selected ? '1px' : '0'};
  :hover {
    background-color: #eaeaea;
  }
`;

class OverlayMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            buttons: []
        }
    }

    componentDidMount() {
        const {data} = this.props;
        const {choiceFile} = this.props.settings;
        const buttons = Object.keys(data[choiceFile]).map((value) => value);
        this.setState({buttons});
    }

    render = () => {
        const {buttons} = this.state;
        const {data} = this.props;
        const {choiceFile, choiceGroup} = this.props.settings;
        if (isEmpty(data)) {
            return null;
        }
        return <Menu>
            <Select onChange={this._selectChangeHandler} value={choiceFile}>
                {Object.keys(data).map((value, index) => <option key={`map_select_options_${index}`}>{value}</option>)}
            </Select>
            {buttons.map((value, index) => {
                return <Button
                    onClick={this._buttonClickHandler}
                    key={`map_buttons_options_${index}`}
                    selected={value === choiceGroup}
                >{value}</Button>;
            })}
        </Menu>;
    }

    _selectChangeHandler = (event) => {
        const {dispatch, data} = this.props;
        const {value} = event.target;
        const buttons = Object.keys(data[value]).map((value) => value)
        this.setState({buttons}, () => dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceFile: value, choiceGroup: buttons[0]}}));
        localStorage.setItem('ART_CHOICE', JSON.stringify({choiceFile: value, choiceGroup: buttons[0]}));
    }

    _buttonClickHandler = (event) => {
        const {dispatch} = this.props;
        const {choiceFile} = this.props.settings;
        const {innerText} = event.target;
        dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceGroup: innerText}});
        localStorage.setItem('ART_CHOICE', JSON.stringify({choiceFile, choiceGroup: innerText}));
    }

}

export default connect(
    (mapStateToProps) => ({
        settings: mapStateToProps.settings,
        data: mapStateToProps.data
    }),
)(OverlayMenu);
