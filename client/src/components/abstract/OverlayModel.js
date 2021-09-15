import React from 'react';
import styled from 'styled-components';
import CloseButton from "../atomic/CloseButton";
import ExpandButton from "../atomic/ExpandButton";
import {connect} from "react-redux";
import ExpandCorner from "../atomic/ExpandCorner";
import CompressButton from "../atomic/CompressButton";

const InnerWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 99;
  box-shadow: 0 0 11px 2px rgba(34, 60, 80, 0.6);
  border: 1px solid #989898;
  background-color: #e7eaed;
  border-radius: 5px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0 2px 2px 2px;
`
const Title = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  background-color: #e7eaed;
  justify-content: flex-end;
`;

const OuterWrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #989898;
  overflow: hidden;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;

class OverlayModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: props.defaultSettings.width,
            height: props.defaultSettings.height,
            top: props.defaultSettings.top,
            left: props.defaultSettings.left,
            full: props.defaultSettings.full,
            captureX: 0,
            captureY: 0,
            cursor: 'default'
        }
    }

    componentDidMount() {
        const {name, defaultSettings} = this.props;
        const {screenWidth, screenHeight} = this.props.settings;
        const storage = localStorage.getItem(`OVERLAY_${name}`);
        if (!storage) {
            localStorage.setItem(`OVERLAY_${name}`, JSON.stringify({...defaultSettings, compressValue: defaultSettings}));
        } else {
            const {width, height, top, left, full, compressValue} = JSON.parse(storage);
            if (full) {
                this.setState({
                    width: screenWidth,
                    height: screenHeight,
                    compressValue,
                    full: true, top: 0, left: 0
                });
            } else {
                this.setState({width, height, top, left});
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {screenWidth, screenHeight} = this.props.settings;
        const {full} = this.state;
        if (prevProps.settings.screenWidth !== screenWidth || prevProps.settings.screenHeight !== screenHeight) {

            if (full) {
                this.setState({
                    width: screenWidth,
                    height: screenHeight,
                    full: true, top: 0, left: 0
                }, () => () => {
                    const {width, height, top, left, full} = this.state;
                    this._storageUpdate({width, height, top, left, full});
                });
            }

        }
    }

    render = () => {
        const {width, height, top, full, left, cursor} = this.state;
        const {overlays, menu} = this.props;
        if (!overlays.main) {
            return null;
        }
        return <InnerWrapper style={{width: `${width}px`, height: `${height}px`, top: `${top}px`, left: `${left}px`, cursor}}>

                <Title onMouseDown={this._mouseDownHandler}>

                    {full
                        ? <CompressButton onClick={this._compressHandler}/>
                        : <ExpandButton onClick={this._expandHandler}/>
                    }

                    <CloseButton onClick={this._closeHandler}/>
                </Title>

                {menu ? menu : null}

                <OuterWrapper>
                    {this.props.children}
                </OuterWrapper>

                <ExpandCorner resize={this._cornerResize} endResize={this._cornerEndResize}/>

            </InnerWrapper>;
    }

    _mouseDownHandler = (event) => {
        const {target, currentTarget} = event;
        const {layerX, layerY} = event.nativeEvent;
        if (target !== currentTarget) {
            return
        }
        window.addEventListener('mousemove', this._mouseMoveHandler);
        window.addEventListener('mouseup', this._mouseUpHandler);
        this.setState({captureX: layerX, captureY: layerY, cursor: 'move'});
    }

    _mouseUpHandler = () => {
        const {top, left} = this.state;
        window.removeEventListener('mousemove', this._mouseMoveHandler);
        window.removeEventListener('mouseup', this._mouseUpHandler);
        this.setState({cursor: 'default', full: false});
        this._storageUpdate({top, left, full: false});
    }

    _mouseMoveHandler = (event) => {
        event.preventDefault();
        const {y, x} = event;
        const {captureX, captureY} = this.state;
        this.setState({top: (y < 0 ? 0 : y) - captureY, left: (x < 0 ? 0 : x) - captureX});
    }

    _expandHandler = () => {
        const {screenWidth, screenHeight} = this.props.settings;
        const {width, height, top, left} = this.state;
        const compressValue =  {width, height, top, left};
        const data = {
            width: screenWidth,
            height: screenHeight,
            compressValue,
            full: true, top: 0, left: 0
        }
        this.setState(data, () => this._storageUpdate(data));
    }

    _compressHandler = () => {
        const {compressValue} = this.state;
        const data = {...compressValue, full: false};
        this.setState(data, () => this._storageUpdate(data));

    }

    _closeHandler = () => {
        const {name} = this.props;
        this.props.dispatch({ type: `OVERLAYS_${name}_STATE`, payload: false });
    }

    _cornerResize = (x, y) => {
        const {width, height} = this.state;
        this.setState({width: width + x, height: height + y, full: false});
    }

    _cornerEndResize = () => {
        const {width, height} = this.state;
        this._storageUpdate({width, height, full: false});
    }

    _storageUpdate = (data) => {
        const {name} = this.props;
        const storage = localStorage.getItem(`OVERLAY_${name}`);
        const parsedStorage = JSON.parse(storage);
        for (let key in data) {
            parsedStorage[key] = data[key];
        }
        localStorage.setItem(`OVERLAY_${name}`, JSON.stringify(parsedStorage));
    }
}

export default connect(
    (mapStateToProps) => ({
        overlays: mapStateToProps.overlays,
        settings: mapStateToProps.settings
    }),
)(OverlayModel);
