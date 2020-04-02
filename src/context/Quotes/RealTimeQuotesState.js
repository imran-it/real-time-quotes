import React, { useReducer } from 'react';
import { RealTimeQuotesContext } from "./RealTimeQuotesContext";
import { RealTimeQuotesReducer } from "./RealTimeQuotesReducer";

export const RealTimeQuotesState = ({ children }) => {
  const initialSate = {
    EURUSD: {},
    GBPUSD: {},
    USDJPY: {},
    USDCHF: {},
    USDCAD: {},
    AUDUSD: {},
    GOLD: {},
    AUDCAD: {},
    GBPCHF: {},
    GBPCAD: {},
    USDRUR: {},
    NZDDKK: {},
    AUDHKD: {},
  };

  const [state, dispatch] = useReducer(RealTimeQuotesReducer, initialSate);

  const setData = (data) => {
    const quoteName = `CHANGE_${data.symbol}`
    dispatch({type: quoteName, payload: data})
  }

  return (
    <RealTimeQuotesContext.Provider
      value={{
        EURUSD: state.EURUSD,
        GBPUSD: state.GBPUSD,
        USDJPY: state.USDJPY,
        USDCHF: state.USDCHF,
        USDCAD: state.USDCAD,
        AUDUSD: state.AUDUSD,
        GOLD: state.GOLD,
        AUDCAD: state.AUDCAD,
        GBPCHF: state.GBPCHF,
        GBPCAD: state.GBPCAD,
        USDRUR: state.USDRUR,
        NZDDKK: state.NZDDKK,
        AUDHKD: state.AUDHKD,
        setData
      }}
    >
      {children}
    </RealTimeQuotesContext.Provider>
  );
};