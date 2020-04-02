import React, { useReducer } from 'react';
import { CHANGE_SCREEN } from '../types';
import { DashboardContext } from "./DashboardContext";
import { DashboardReducer } from "./DashboardReducer";

const DashboardState = ({children}) => {
  const initialSate = {
    quoteId: null,
    header: 'Insta Forex Quotes',
    quoteData: {},

  };
  const [state, dispatch] = useReducer(DashboardReducer, initialSate);

  const changeScreen = quote => dispatch({type: CHANGE_SCREEN, payload: quote});

  return (
    <DashboardContext.Provider
      value={{
        changeScreen,
        quoteId: state.quoteId,
        quoteData: state.quoteData,
        header: state.header,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
};

export default DashboardState;