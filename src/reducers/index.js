import {combineReducers} from 'redux';
import steps from './steps';
import formsReducer from './forms';
import visibilityFilter from './visibleFilters'

const stepsApp = combineReducers({
  steps,
  formsReducer,
  visibilityFilter
})
 
export default stepsApp
