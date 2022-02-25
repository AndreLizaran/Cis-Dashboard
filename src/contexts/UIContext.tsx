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
  dashboardScreen:DashboardScreen,
  animations: {
    dashboardSidebarAnimation:boolean,
    alertAnimation:boolean
  }
}

export type UIContextType = {
  state:UIStateType,
  switchShowDashboardBar: () => void,
  setAlertInformation: (payload:SetAlertInformationParams) => void,
  setDashboardScreen: (payload:DashboardScreen) => void
  switchAlert: (payload:SwitchAlertParams) => void
}

export type DashboardScreen = 'events' | 'news' | 'users' | 'expositores';

export type SwitchAlertParams = { color:string, alert:string } | null

const initialState:UIStateType = {
  showDashboardBar:true,
  alert: {
    color:'',
    alert:'',
  },
  dashboardScreen:'events',
  animations: {
    dashboardSidebarAnimation:true,
    alertAnimation:true
  }
}

export const UIContext = createContext({} as UIContextType);

export default function UIState ({ children }:any) {

  const [state, dispatch] = useReducer(uiReducer, initialState);

  // Dashboard
  function switchShowDashboardBar () {
    if (state.showDashboardBar) {
      setDashboardBarAnimation(false);
      setTimeout(() => {
        setShowDashboard(false);
        setDashboardBarAnimation(true);
      }, 500);
    } else setShowDashboard(true);
  }

  function setShowDashboard (payload:boolean) {
    dispatch({ type:'SET_SHOW_DASHBOARD_BAR', payload });
  }

  function setDashboardBarAnimation (payload:boolean) {
    dispatch({ type:'SET_DASHBOARD_BAR_ANIMATION', payload });
  }

  function setDashboardScreen (payload:DashboardScreen) {
    dispatch({ type:'SET_DASHBOARD_SCREEN', payload });
  }

  // Alert
  function setAlertInformation (payload:SetAlertInformationParams) {
    dispatch({ type:'SET_ALERT_INFORMATION', payload });
  }

  function setAlertAnimation (payload:boolean) {
    dispatch({ type:'SET_ALERT_ANIMATION', payload });
  }

  function switchAlert (payload:SwitchAlertParams) {
    if (payload === null) {
      setAlertAnimation(false);
      setTimeout(() => {
        setAlertInformation({ alert:'', color:'' });
        setAlertAnimation(true);
      }, 500);
    } else setAlertInformation(payload);
  }
  
  return (
    <UIContext.Provider 
      value={{ 
        state,
        switchShowDashboardBar,
        setAlertInformation,
        setDashboardScreen,
        switchAlert
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