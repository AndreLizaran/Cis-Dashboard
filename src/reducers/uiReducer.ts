// Types
import { DashboardScreen, SetAlertInformationParams, UIStateType } from '../contexts/UIContext';

type ActionTypes = 
  // Dashboard
  { type:'SET_DASHBOARD_SCREEN', payload:DashboardScreen } | 
  { type:'SET_SHOW_DASHBOARD_BAR', payload:boolean } |
  { type:'SET_DASHBOARD_BAR_ANIMATION', payload:boolean } |
  // Alert
  { type:'SET_ALERT_ANIMATION', payload:boolean } |
  { type:'SET_ALERT_INFORMATION', payload:SetAlertInformationParams }

export default function uiReducer (state:UIStateType, action:ActionTypes):UIStateType {
  switch (action.type) {
    case 'SET_DASHBOARD_BAR_ANIMATION': 
      return {
        ...state,
        animations: {
          ...state.animations,
          dashboardSidebarAnimation: action.payload
        }
      }
    case 'SET_SHOW_DASHBOARD_BAR': 
      return {
        ...state,
        showDashboardBar: action.payload
      }
    case 'SET_DASHBOARD_SCREEN': 
      return {
        ...state,
        dashboardScreen: action.payload
      }
    case 'SET_ALERT_INFORMATION': 
      return {
        ...state,
        alert: {
          color: action.payload.color,
          alert: action.payload.alert,
        }
      }
    case 'SET_ALERT_ANIMATION': 
      return {
        ...state,
        animations: {
          ...state.animations,
          alertAnimation: action.payload
        }
      }
    default:
      return state;
  }
}