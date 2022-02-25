// Modules
import { useContext } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';

// Classes
import { fadeIn, fadeOut } from '../classes';

// Components
import Alert from '../components/Alert';
import RoundedButton from '../components/RoundedButton';
import DashboardSidebar from '../components/DashboardSidebar';

// Contexts
import { UIContext } from '../contexts/UIContext';

// Hooks
import { useUIContext } from '../hooks/useCustomContext';

// Screens
import News from '../screens/dashboard/News';
import Users from '../screens/dashboard/Users';
import Events from '../screens/dashboard/Events';
import Expositores from '../screens/dashboard/Expositores';

export default function Dashboard() {  

  const { state } = useUIContext();
  const { showDashboardBar } = state;

  return (
    <>
      <div className='flex flex-col w-full' style={{ minHeight:'100vh' }}>
        <DashboardSideBarSpace/>
        <div className='flex w-full'>
          {showDashboardBar && <div className='sm:w-6/12 md:w-4/12 bg-gray-100'/>}
          <main className={`p-6 bg-gray-100 min-h-screen ${showDashboardBar ? 'w-full sm:w-6/12 md:w-8/12' : 'w-full'}`}>
            <MainScreen/>
          </main>
        </div>
      </div>
      <Alert/>
    </>
  )
}

function  DashboardSideBarSpace () {

  const { state, switchShowDashboardBar } = useContext(UIContext);
  const { showDashboardBar, animations } = state;
  const { dashboardSidebarAnimation } = animations;
  
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
        className={dashboardSidebarAnimation ? fadeIn : fadeOut}
        action={switchShowDashboardBar}
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
    case 'expositores':
      return <Expositores/>
    case 'users':
      return <Users/>
    default:
      return <></>
  }
}