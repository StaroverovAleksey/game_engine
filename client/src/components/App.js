import React from "react";
import Main from "./pages/Main";
import Overlay from "./pages/Overlay";
import {connect} from "react-redux";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.document.addEventListener('keydown', this._keyHandler);
        window.addEventListener('resize', this._resizeHandler);
    }

    render = () => {
        return <>
            <Main/>
            <Overlay/>
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
}

export default connect(
    (mapStateToProps) => ({
        overlays: mapStateToProps.overlays
    }),
)(App);
