import React from "react";
import styled from 'styled-components';
import {connect} from "react-redux";
import SubstrateLayer from "../../canvas/SubstrateLayer";
import DynamicLayer from "../../canvas/DynamicLayer";
import ImageLoader from "../../canvas/ImageLoader";

const Canvas = styled.canvas`
  position: absolute;
`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.mouseX = 0;
        this.mouseY = 0;
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.substrateLayer = new SubstrateLayer(this.callback);
        this.dynamicLayer = new DynamicLayer();
        this._initial().then(() => {
            this._run();
            this.setState({loading: false});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {data} = this.props;
        const {choiceFile, choiceGroup, choiceSubgroup, choiceItem} = this.props.settings;
        if (prevProps.settings.choiceItem !== choiceItem || prevProps.settings.choiceSubgroup !== choiceSubgroup) {
            try {
                this.dynamicLayer.setImage(this.images[choiceFile], data[choiceFile][choiceGroup][choiceSubgroup][choiceItem]);
                this.dynamicLayer.setCoord(this.mouseX, this.mouseY);
            } catch (e) {
                this.dynamicLayer.setImage(null);
                this.dynamicLayer.clearCanvas();
            }
        }
    }

    render = () => {
        return <>
            <Canvas className={'substrate_canvas'}/>
            <Canvas className={'main_canvas'}/>
        </>
    }

    _initial = async () => {
        const {data} = this.props;
        const loader = new ImageLoader(data);
        this.images = await loader.load();
    }

    _run = () => {
        requestAnimationFrame((time) => this._frame(time))
    }

    _frame = () => {
        requestAnimationFrame((time) => this._frame(time))
    }

    callback = (x, y) => {
        this.mouseX = x;
        this.mouseY = y;
        this.dynamicLayer.setCoord(x, y);
    }
}

export default connect(
    (mapStateToProps) => ({
        settings: mapStateToProps.settings,
        data: mapStateToProps.data,
    }),
)(Main);
