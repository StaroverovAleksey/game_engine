import React from "react";
import styled from 'styled-components';
import {Game} from "../../canvas/Game";

const Canvas = styled.canvas`
`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cellHeight: 32
        }
    }

    componentDidMount() {
        const {sizeMap, cellHeight} = this.state;
        this.game = new Game({sizeMap, cellHeight}, this.loadCallback);
        this.game.run();
    }

    render = () => {
        return <Canvas/>
    }

    loadCallback = () => {

    }
}

export default Main;
