import React from "react";
import styled from 'styled-components';
import {Game} from "../../canvas/Game";

const Canvas = styled.canvas`
  position: absolute;
`

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.game = new Game({}, this.loadCallback);
        this.game.run();
    }

    render = () => {
        return <>
            <Canvas className={'substrate_canvas'}/>
            <Canvas className={'main_canvas'}/>
        </>
    }

    loadCallback = () => {

    }
}

export default Main;
