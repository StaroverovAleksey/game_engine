import React from "react";
import styled from 'styled-components';
import {Game} from "../../canvas/Game";

const Canvas = styled.canvas`
`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sizeMap: {
                x: 8,
                y: 4
            },
            sizeCell: {
                x: 64,
                y: 32
            }
        }
    }

    componentDidMount() {
        const {sizeMap, sizeCell} = this.state;
        this.game = new Game({sizeMap, sizeCell}, this.loadCallback);
        this.game.run();
        console.log(this.game);
    }

    render = () => {
        return <Canvas/>
    }

    loadCallback = () => {

    }
}

export default Main;
