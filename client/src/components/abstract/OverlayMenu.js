import React from 'react';
import styled from 'styled-components';

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
`

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
            selectValue: '',
            buttonValue: '',
            buttons: []
        }
    }

    componentDidMount() {
        /*const {data, callback} = this.props;
        const storage = localStorage.getItem('ART_CHOICE');
        if (!storage) {
            const selectValue = (Object.keys(data)[0]);
            const buttonValue = Object.keys(data[selectValue])[0];
            this.setState({
                selectValue,
                buttonValue,
                buttons: Object.keys(data[selectValue]).map((value) => value)
            });
            localStorage.setItem('ART_CHOICE', JSON.stringify({selectValue, buttonValue}));
            callback({selectValue, buttonValue});
        } else {
            const {selectValue, buttonValue} = JSON.parse(storage);
            this.setState({
                selectValue,
                buttonValue,
                buttons: Object.keys(data[selectValue]).map((value) => value)
            });
            callback({selectValue, buttonValue});
        }*/
    }

    render = () => {
        const {selectValue, buttonValue, buttons} = this.state;
        const {data} = this.props;
        return <Menu>
            <Select onChange={this._selectChangeHandler} value={selectValue}>
                {Object.keys(data).map((value, index) => <option key={`map_select_options_${index}`}>{value}</option>)}
            </Select>
            {buttons.map((value, index) => {
                return <Button
                    onClick={this._buttonClickHandler}
                    key={`map_buttons_options_${index}`}
                    selected={value === buttonValue}
                >{value}</Button>;
            })}
        </Menu>;
    }

    _selectChangeHandler = (event) => {
        const {value} = event.target;
        const {data, callback} = this.props;
        const newState = {
            selectValue: value,
            buttonValue: Object.keys(data[value])[0]
        }
        this.setState({
            ...newState,
            buttons: Object.keys(data[value]).map((value) => value)
        });
        localStorage.setItem('ART_CHOICE', JSON.stringify(newState));
        callback(newState);
    }

    _buttonClickHandler = (event) => {
        const {selectValue} = this.state;
        const {callback} = this.props;
        const {innerText} = event.target;
        this.setState({buttonValue: innerText});
        localStorage.setItem('ART_CHOICE', JSON.stringify({selectValue, buttonValue: innerText}));
        callback({selectValue, buttonValue: innerText});
    }

}

export default OverlayMenu;
