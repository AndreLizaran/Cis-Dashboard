// Modules
import { useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Classes
import { fadeIn, fadeOut } from '../classes';

// Components
import Alert from '../components/simple/Alert';
import RoundedButton from '../components/simple/RoundedButton';
import DashboardSidebar from '../components/integrated/DashboardSidebar';

// Contexts
import { UIContext } from '../contexts/UIContext';

// Hooks
import useShowHideAnimation from '../hooks/useShowHideAnimation';

// Screens
import News from '../screens/dashboard/News';
import Events from '../screens/dashboard/Events';

export default function Dashboard() {  

  const { state } = useContext(UIContext);
  const { showDashboardBar } = state;

  return (
    <>
      <div className='flex flex-col w-full' style={{ minHeight:'100vh' }}>
        <DashboardSideBarSpace/>
        <div className='flex w-full'>
          { showDashboardBar && <div className='sm:w-6/12 md:w-4/12'/> }
          <main 
            className={`
              p-6 bg-gray-100 min-h-screen 
              ${showDashboardBar ? 'w-full sm:w-6/12 md:w-8/12' : 'w-full'}
            `}
          >
            <MainScreen/>
          </main>
        </div>
      </div>
      <Alert/>
    </>
  )
}

function DashboardSideBarSpace () {

  const { state, switchShowDashboardBar } = useContext(UIContext);
  const {
    showDashboardBar
  } = state;

  const {
    animation,
    switchAnimation
  } = useShowHideAnimation(
    fadeIn, 
    fadeOut, 
    showDashboardBar, 
    switchShowDashboardBar
  );
  
  return (
    <>
    { 
      showDashboardBar 
      ?
      <div className='fixed w-full sm:w-6/12 md:w-4/12' style={{ zIndex:2 }}>
        <DashboardSidebar/>
      </div>
      :
      <RoundedButton 
        color='blue-500' 
        icon={faBars} 
        style={{ right:24, top:24, position:'fixed', zIndex:2 }}
        className={animation}
        action={switchAnimation}
        square={true}
      />
    }
    </>
  )
}

function MainScreen () {

  const { state } = useContext(UIContext);
  const {
    dashboardScreen
  } = state;

  switch (dashboardScreen) {
    case 'events':
      return <Events/>
    case 'news':
      return <News/>
    default:
      return <></>
  }
}