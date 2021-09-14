import { combineReducers } from 'redux';
import overlays from './overlays';
import settings from './settings';

export default combineReducers({
  overlays,
  settings
});
