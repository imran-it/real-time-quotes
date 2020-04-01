import {
  CHANGE_AUDUSD,
  CHANGE_EURUSD,
  CHANGE_GBPUSD,
  CHANGE_GOLD,
  CHANGE_USDCAD,
  CHANGE_USDCHF,
  CHANGE_USDJPY
} from "./types";


const handlers = {
  [CHANGE_EURUSD]: (state, payload) => ({...state, EURUSD: {...payload}}),
  [CHANGE_USDCHF]: (state, payload) => ({...state, USDCHF: {...payload}}),
  [CHANGE_USDCAD]: (state, payload) => ({...state, USDCAD: {...payload}}),
  [CHANGE_GOLD]: (state, payload) => ({...state, GOLD: {...payload}}),
  [CHANGE_GBPUSD]: (state, payload) => ({...state, GBPUSD: {...payload}}),
  [CHANGE_AUDUSD]: (state, payload) => ({...state, AUDUSD: {...payload}}),
  [CHANGE_USDJPY]: (state, payload) => ({...state, USDJPY: {...payload}}),
  DEFAULT: state => state,
};

export const MainReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action.payload);
};


// export const MainReducer = (state, action) => {
//   switch (action.type) {
//     case CHANGE_EURUSD:
//       return {
//         ...state,
//         EURUSD: {...action.payload}
//       };
//
//     default:
//       return state;
//   }
// };