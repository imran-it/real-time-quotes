import {
  CHANGE_AUDUSD,
  CHANGE_EURUSD,
  CHANGE_GBPUSD,
  CHANGE_GOLD,
  CHANGE_USDCAD,
  CHANGE_USDCHF,
  CHANGE_USDJPY,
  CHANGE_AUDCAD,
  CHANGE_AUDHKD,
  CHANGE_GBPCAD,
  CHANGE_GBPCHF,
  CHANGE_NZDDKK,
  CHANGE_USDRUR
} from "../types";


const handlers = {
  [CHANGE_EURUSD]: (state, payload) => ({...state, EURUSD: {...payload}}),
  [CHANGE_USDCHF]: (state, payload) => ({...state, USDCHF: {...payload}}),
  [CHANGE_USDCAD]: (state, payload) => ({...state, USDCAD: {...payload}}),
  [CHANGE_GOLD]: (state, payload) => ({...state, GOLD: {...payload}}),
  [CHANGE_GBPUSD]: (state, payload) => ({...state, GBPUSD: {...payload}}),
  [CHANGE_AUDUSD]: (state, payload) => ({...state, AUDUSD: {...payload}}),
  [CHANGE_USDJPY]: (state, payload) => ({...state, USDJPY: {...payload}}),
  [CHANGE_AUDCAD]: (state, payload) => ({...state, AUDCAD: {...payload}}),
  [CHANGE_AUDHKD]: (state, payload) => ({...state, AUDHKD: {...payload}}),
  [CHANGE_GBPCAD]: (state, payload) => ({...state, GBPCAD: {...payload}}),
  [CHANGE_GBPCHF]: (state, payload) => ({...state, GBPCHF: {...payload}}),
  [CHANGE_NZDDKK]: (state, payload) => ({...state, NZDDKK: {...payload}}),
  [CHANGE_USDRUR]: (state, payload) => ({...state, USDRUR: {...payload}}),
  DEFAULT: state => state,
};

export const MainReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};