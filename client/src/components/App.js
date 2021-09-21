import React from "react";
import Main from "./pages/Main";
import MainOverlay from "./pages/MainOverlay";
import map from "../../../arts/map.json";
import map1 from "../../../arts/map1.json";
import {connect} from "react-redux";
import {firstProp, isEmpty, nextProp, previousProp} from "../tools/utils";
import MainMenu from "./abstract/MainMenu";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.document.addEventListener('keydown', this._keyHandler);
        window.addEventListener('resize', this._resizeHandler);
        const data = {map, map1};
        this.setState({data}, () => {
            this._checkChoiceArt();
            this.props.dispatch({type: 'DATA_LOAD', payload: data});
        });
    }

    render = () => {
        const {data} = this.props;
        if (isEmpty(data)) {
            return null;
        }
        return <>
            <Main/>
            <MainMenu/>
            <MainOverlay/>
        </>;
    }

    _keyHandler = (event) => {
        const {data} = this.state;
        const {dispatch, overlays} = this.props;
        const {choiceFile, choiceGroup, choiceSubgroup, choiceItem} = this.props.settings;
        switch (event.code) {
            case 'Space':
                if(overlays.main) {
                    dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceSubgroup: null, choiceItem: null}});
                }
                dispatch({ type: 'OVERLAYS_MAIN_STATE', payload: !overlays.main });
                break;
            case 'Escape':
                if(overlays.main) {
                    dispatch({ type: 'OVERLAYS_MAIN_STATE', payload: false });
                    dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceSubgroup: null, choiceItem: null}});
                }
                break;
            case 'ArrowRight':
                if(overlays.main && choiceSubgroup) {
                    dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceItem: data[choiceFile][choiceGroup][choiceSubgroup].length - 1 > choiceItem ? choiceItem + 1 : 0}});
                }
                break;
            case 'ArrowLeft':
                if(overlays.main && choiceSubgroup) {
                    dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceItem: choiceItem > 0 ? choiceItem - 1 : data[choiceFile][choiceGroup][choiceSubgroup].length - 1}});
                }
                break;
            case 'ArrowUp':
                if(overlays.main && choiceSubgroup) {
                    dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceSubgroup: previousProp(data[choiceFile][choiceGroup], choiceSubgroup), choiceItem: 0}});
                }
                break;
            case 'ArrowDown':
                if(overlays.main && choiceSubgroup) {
                    dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceSubgroup: nextProp(data[choiceFile][choiceGroup], choiceSubgroup), choiceItem: 0}});
                }
                break;
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
            const props = ['choiceFile', 'choiceGroup'];
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
        dispatch({type: 'SETTINGS_ART_CHOICE', payload: {choiceFile, choiceGroup}});
        localStorage.setItem('ART_CHOICE', JSON.stringify({choiceFile, choiceGroup}));
    }
}

export default connect(
    (mapStateToProps) => ({
        overlays: mapStateToProps.overlays,
        settings: mapStateToProps.settings,
        data: mapStateToProps.data,
    }),
)(App);
