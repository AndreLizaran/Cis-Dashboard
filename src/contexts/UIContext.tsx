// Modules
import { createContext, useReducer } from 'react';

// Reducers 
import uiReducer from '../reducers/uiReducer';

export type UIStateType = {
  showDashboardBar:boolean
  alert: {
    color:string,
    alert:string,
  },
  dashboardScreen:DashboardScreen
}

export type UIContextType = {
  state:UIStateType,
  switchShowDashboardBar: () => void,
  setAlertInformation: (payload:SetAlertInformationParams) => void,
  setDashboardScreen: (payload:DashboardScreen) => void
}

export type DashboardScreen = 'events' | 'news' | 'users' | 'expositores';

const initialState:UIStateType = {
  showDashboardBar:true,
  alert: {
    color:'',
    alert:'',
  },
  dashboardScreen:'events'
}

export const UIContext = createContext({} as UIContextType);

export default function UIState ({ children }:any) {

  const [state, dispatch] = useReducer(uiReducer, initialState);

  function switchShowDashboardBar () {
    dispatch({ type:'SWITCH_SHOW_DASHBOARD_BAR' });
  }

  function setAlertInformation (payload:SetAlertInformationParams) {
    dispatch({ type:'SET_ALERT_INFORMATION', payload });
  }

  function setDashboardScreen (payload:DashboardScreen) {
    dispatch({ type:'SET_DASHBOARD_SCREEN', payload });
  }

  return (
    <UIContext.Provider 
      value={{ 
        state,
        switchShowDashboardBar,
        setAlertInformation,
        setDashboardScreen
      }}
    >
      {children}
    </UIContext.Provider>
  )

}

export type SetAlertInformationParams = {
  color:string,
  alert:string,
}