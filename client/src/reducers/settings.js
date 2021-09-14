const defaultState = {
  screenWidth: window.document.documentElement.clientWidth,
  screenHeight: window.document.documentElement.clientHeight
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case 'SETTINGS_RESIZE':
      const {screenWidth, screenHeight} = action.payload;
      return { ...defaultState, screenWidth, screenHeight };
    default: return state;
  }
}
