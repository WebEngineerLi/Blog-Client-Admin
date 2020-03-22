import { createSelector } from 'reselect'
import * as cons from './constants';
export const getState = (state) => state[cons.NAMESPACE] //eslint-disable-line

export const getCvList = createSelector(
  getState,
  (state) => state.cvList
)