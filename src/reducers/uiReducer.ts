// Types
import { DashboardScreen, SetAlertInformationParams, UIStateType } from '../contexts/UIContext';

type ActionTypes = 
  { type:'SWITCH_SHOW_DASHBOARD_BAR' } |
  { type:'SET_ALERT_INFORMATION', payload:SetAlertInformationParams } |
  { type:'SET_DASHBOARD_SCREEN', payload:DashboardScreen } 

export default function uiReducer (state:UIStateType, action:ActionTypes):UIStateType {

  switch (action.type) {
    case 'SWITCH_SHOW_DASHBOARD_BAR': 
      return {
        ...state,
        showDashboardBar:!state.showDashboardBar
      }
    case 'SET_ALERT_INFORMATION': 
      return {
        ...state,
        alert: {
          color: action.payload.color,
          alert: action.payload.alert,
        }
      }
    case 'SET_DASHBOARD_SCREEN': 
      return {
        ...state,
        dashboardScreen: action.payload
      }
    default:
      return state;
  }

}