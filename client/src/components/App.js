import React from "react";
import Main from "./pages/Main";
import MainOverlay from "./pages/MainOverlay";
import map from "../../../arts/map.json";
import map1 from "../../../arts/map1.json";
import {connect} from "react-redux";
import {firstProp} from "../tools/utils";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.document.addEventListener('keydown', this._keyHandler);
        window.addEventListener('resize', this._resizeHandler);
        this.setState({data: {map, map1}}, this._checkChoiceArt);
    }

    render = () => {
        return <>
            <Main/>
            <MainOverlay/>
        </>;
    }

    _keyHandler = (event) => {
        const {overlays} = this.props;
        switch (event.code) {
            case 'Space': return this.props.dispatch({ type: 'OVERLAYS_MAIN_STATE', payload: !overlays.main });
            case 'Escape': return overlays.main ? this.props.dispatch({ type: 'OVERLAYS_MAIN_STATE', payload: false }) : null;
        }
    }

    _resizeHandler = () => {
        this.props.dispatch({
            type: 'SETTINGS_RESIZE',
            payload: {
                screenWidth: window.document.documentElement.clientWidth,
                screenHeight: window.document.documentElement.clientHeight
            }
        });
    }

    _checkChoiceArt = () => {
        const {dispatch} = this.props;
        const storage = localStorage.getItem('ART_CHOICE');
        const parsedStorage = JSON.parse(storage);
        if (storage) {
            const props = ['choiceFile', 'choiceGroup', 'choiceSubgroup', 'choiceItem'];
            props.forEach((value) => {
                return parsedStorage.hasOwnProperty(value)
                    && parsedStorage[value]
                    && dispatch({type: 'SETTINGS_ART_CHOICE', payload: {[value]: parsedStorage[value]}})
            });
        } else {
            this._setChoiceArt();
        }
    }

    _setChoiceArt = () => {
        const {data} = this.state;
        const {dispatch} = this.props;
        const choiceFile = firstProp(data);
        const choiceGroup = firstProp(data[choiceFile]);
        const choiceSubgroup = firstProp(data[choiceFile][choiceGroup]);
        dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceFile, choiceGroup, choiceSubgroup}});
        localStorage.setItem('ART_CHOICE', JSON.stringify({choiceFile, choiceGroup, choiceSubgroup, choiceItem: null}));
    }
}

export default connect(
    (mapStateToProps) => ({
        overlays: mapStateToProps.overlays
    }),
)(App);
