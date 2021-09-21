import React from "react";
import styled from 'styled-components';
import {connect} from "react-redux";
import SubstrateLayer from "../../canvas/SubstrateLayer";
import DynamicLayer from "../../canvas/DynamicLayer";
import ImageLoader from "../../canvas/ImageLoader";
import ImageLayer from "../../canvas/ImageLayer";

const Canvas = styled.canvas`
  position: absolute;
`

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.mouseX = 0;
        this.mouseY = 0;
        this.state = {
            loading: true,
            chosenFile: null,
            chosenData: null,
            mapData: []
        }
    }

    componentDidMount() {
        const mapData = JSON.parse(localStorage.getItem('MAP_DATA')) || [];
        this.setState({mapData}, () => {
            this.substrateLayer = new SubstrateLayer(this.callback);
            this.dynamicLayer = new DynamicLayer();
            this.imageLayer = new ImageLayer(mapData);
        });
        this._initial().then(() => {
            this._run();

            mapData.forEach((value) => {
                this.imageLayer.drawImage(value.coord.x, value.coord.y, this.images[value.img], value.data);
            })


            this.setState({loading: false});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {data} = this.props;
        const {choiceFile, choiceGroup, choiceSubgroup, choiceItem} = this.props.settings;
        if (prevProps.settings.choiceItem !== choiceItem || prevProps.settings.choiceSubgroup !== choiceSubgroup) {

            let chosenFile, chosenData;
            try {
                chosenFile = this.images[choiceFile];
                chosenData = data[choiceFile][choiceGroup][choiceSubgroup][choiceItem];
            } catch (e) {
                chosenFile = null;
                chosenData = null;
            }
            this.setState({chosenFile,chosenData}, () => {
                this.dynamicLayer.drawImage(this.mouseX, this.mouseY, chosenFile, chosenData);
            });

        }
    }

    render = () => {
        return <>
            <Canvas className={'substrate_canvas'}/>
            <Canvas className={'image_canvas'}/>
            <Canvas className={'dynamic_canvas'} onClick={this._clickHandler}/>
        </>
    }

    _initial = async () => {
        const {data} = this.props;
        const loader = new ImageLoader(data);
        this.images = await loader.load();
    }

    _run = () => {
        //requestAnimationFrame((time) => this._frame(time))
    }

    _frame = () => {
        //requestAnimationFrame((time) => this._frame(time))
    }

    callback = (x, y) => {
        const {chosenFile, chosenData} = this.state;
        this.mouseX = x;
        this.mouseY = y;
        this.dynamicLayer.drawImage(x, y, chosenFile, chosenData);
    }

    _clickHandler = () => {
        const {mapData, chosenFile, chosenData} = this.state;
        const {choiceFile} = this.props.settings;
        if (!chosenData) {
            return;
        }
        const newData = JSON.parse(JSON.stringify(mapData));
        newData.push({
            coord: {x: this.mouseX, y: this.mouseY},
            img: choiceFile,
            data: chosenData
        })
        this.setState({mapData: newData});
        this.imageLayer.drawImage(this.mouseX, this.mouseY, chosenFile, chosenData);
        localStorage.setItem('MAP_DATA', JSON.stringify(newData));
    }
}

export default connect(
    (mapStateToProps) => ({
        settings: mapStateToProps.settings,
        data: mapStateToProps.data,
    }),
)(Main);
