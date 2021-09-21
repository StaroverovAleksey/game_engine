import React from "react";
import {connect} from "react-redux";
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 10px;
  right: 0;
  top: 0;
  background-color: #e7eaed;
  box-shadow: 0 0 11px 2px rgb(34 60 80 / 60%);
  border-bottom-left-radius: 10px;
`;

const Fieldset = styled.fieldset`
  display: flex;
  width: 80%;
  flex-direction: column;
  margin-bottom: 4px;
`;

const Label = styled.label`
  cursor: pointer;
  margin-bottom: 4px;
  :last-child {
    margin-bottom: 0;
  }
`;

const Input = styled.input`
  margin-right: 8px;
  cursor: pointer;
`;

const Button = styled.button`
  margin-bottom: 4px;
  cursor: pointer;
  :last-child {
    margin-bottom: 0;
  }
`;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render = () => {
        return <Wrapper>
            <Fieldset>
                <legend>Режим</legend>
                <Label>
                    <Input
                        type={'radio'}
                        name={'mode_input'}
                        value={0}
                        defaultChecked={true}
                    />
                    Стандартный
                </Label>
                <Label>
                    <Input
                        type={'radio'}
                        name={'mode_input'}
                        value={1}
                    />
                    Слои
                </Label>
            </Fieldset>
            <Fieldset>
                <legend>Действия</legend>
                <Button>Оверлей</Button>
                <Button>Сохранить</Button>
            </Fieldset>
        </Wrapper>
    }
}

export default connect(
    (mapStateToProps) => ({
        overlays: mapStateToProps.overlays,
        settings: mapStateToProps.settings,
        data: mapStateToProps.data,
    }),
)(App);
