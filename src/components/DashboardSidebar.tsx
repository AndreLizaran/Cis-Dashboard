// Modules
import { useContext, useEffect } from 'react';
import { 
  faCalendar,  
  faBars, 
  IconDefinition,
  faUserCheck,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';

// Classes
import { fadeInLeft, fadeOutLeft } from '../classes';

// Components
import H2 from './H2';
import RoundedButton from './RoundedButton';

// Contexts
import { UIContext } from '../contexts/UIContext';

// Hooks
import { useUIContext } from '../hooks/useCustomContext';

export default function DashboardBar() {

  const { switchShowDashboardBar, setDashboardScreen, state } = useContext(UIContext);
  const { animations } = state;
  const { dashboardSidebarAnimation } = animations;

  useEffect(() => {
    let currentScreen = localStorage.getItem('current-dashboard-screen') as string;
    if (!currentScreen) return;
    switch (Number(currentScreen)) {
      case 1:
        setDashboardScreen('events');
        break;
      case 2:
        setDashboardScreen('news');
        break;
      case 3:
        setDashboardScreen('expositores');
        break;
    }
  }, []);

  return (
    <div className={`p-6 bg-gray-800 h-screen flex flex-col justify-between rounded-r w-full ${dashboardSidebarAnimation ? fadeInLeft: fadeOutLeft }`}>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center mb-6'>
          <H2 className='text-white'>Panel de control</H2>
          <RoundedButton
            icon={faBars}
            color='blue-500'
            action={() => switchShowDashboardBar()}
            square={true}
          />
        </div>
        <OptionsList/>
      </div>
      <div className='flex justify-between items-center'>
        <H2 className='text-white'>André Lizarán</H2>
        <RoundedButton color='red-600' icon={faSignOut} square={true}/>
      </div>
    </div>
  )
}

const containerClass = `
  flex flex-col gap-4 overflow-y-auto scrollbar-thin 
  scrollbar-thumb-blue-500 scrollbar-track-gray-700
  custom-scrollbar-dashboard
`

function OptionsList () {
  return ( 
    <div 
      className={containerClass}>
      {options.map((option) => (
        <OptionElement option={option} key={option.id}/>
      ))}
    </div>
  )
}

type OptionElementProps = {
  option: {
    id: number;
    text: string;
    icon: IconDefinition;
  };
}

function OptionElement ({ option }:OptionElementProps) {

  const {
    id,
    text,
    icon,
  } = option;
  const { setDashboardScreen, switchShowDashboardBar } = useUIContext();

  function changeScreen (hide:boolean) {
    hide && switchShowDashboardBar();
    localStorage.setItem('current-dashboard-screen', id.toString());
    switch (id) {
      case 1:
        setDashboardScreen('events');
        break;
      case 2:
        setDashboardScreen('news');
        break;
      case 3:
        setDashboardScreen('expositores');
        break;
    }
  }

  return (
    <>
      <div 
        className='hidden sm:flex justify-between items-center p-3 pl-4 rounded bg-gray-700 border-2 border-gray-700 hover:border-gray-600 cursor-pointer'
        onClick={() => changeScreen(false)}
      >
        <span className='font-semibold text-white'>{text}</span>
        <RoundedButton
          color='gray-800'
          icon={icon}
          square={true}
          hover={false}
        />
      </div>
      <div 
        className='sm:hidden flex justify-between items-center p-3 pl-4 rounded bg-gray-700 border-2 border-gray-700 hover:border-gray-600 cursor-pointer'
        onClick={() => changeScreen(true)}
      >
        <span className='font-semibold text-white'>{text}</span>
        <RoundedButton
          color='gray-800'
          icon={icon}
          square={true}
          hover={false}
        />
      </div>
    </>
  )
}

const options = [
  {
    id:1,
    text:'Eventos',
    icon: faCalendar
  },
  {
    id:3,
    text:'Expositores',
    icon: faUserCheck
  },
]