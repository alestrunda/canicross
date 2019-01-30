import { combineReducers } from 'redux';
import app from './app';
import dogs from './dogs';
import users from './users';
import walkingSchedule from './walkingSchedule';

export default combineReducers({
  app,
  dogs,
  users,
  walkingSchedule
});