// Modules
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { 
  faCalendar,  
  faBars, 
  IconDefinition,
  faUserCheck,
  faSignOut,
  faNewspaper,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'

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
  const navigation = useNavigate();
  const [currentScreen, setCurrentScreen] = useState(1);

  useEffect(() => {
    let screen = localStorage.getItem('current-dashboard-screen') as string;
    if (!screen) screen = '1';
    switch (Number(screen)) {
      case 1:
        setDashboardScreen('events');
        setCurrentScreen(1);
        break;
      case 2:
        setDashboardScreen('news');
        setCurrentScreen(2);
        break;
      case 3:
        setDashboardScreen('expositores');
        setCurrentScreen(3);
        break;
    }
  }, []);

  return (
    <div className={`p-6 bg-gray-800 h-screen flex flex-col justify-between rounded-r w-full ${dashboardSidebarAnimation ? fadeInLeft: fadeOutLeft }`}>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center mb-6'>
          <H2 className='text-white'>CIS Dashboard</H2>
          <RoundedButton
            icon={faBars}
            color='blue-500'
            action={() => switchShowDashboardBar()}
            square={true}
          />
        </div>
        <OptionsList currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
      </div>
      <div className='flex justify-between items-center'>
        <H2 className='text-white'>André Lizarán</H2>
        <RoundedButton color='red-600' icon={faSignOut} square={true} action={() => { navigation('/login'); localStorage.removeItem('cis-dashboard-token'); }}/>
      </div>
    </div>
  )
}

const containerClass = `
  flex flex-col gap-4 overflow-y-auto scrollbar-thin 
  scrollbar-thumb-blue-500 scrollbar-track-gray-700
  custom-scrollbar-dashboard
`

type OptionsListProps = {
  currentScreen:number;
  setCurrentScreen:Dispatch<SetStateAction<number>>
}

function OptionsList ({ currentScreen, setCurrentScreen }:OptionsListProps) {
  return ( 
    <div 
      className={containerClass}>
      {options.map((option) => (
        <OptionElement option={option} key={option.id} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
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
  currentScreen:number;
  setCurrentScreen:Dispatch<SetStateAction<number>>
}

function OptionElement ({ option, currentScreen, setCurrentScreen }:OptionElementProps) {

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
        setCurrentScreen(1);
        break;
      case 2:
        setDashboardScreen('expositores');
        setCurrentScreen(2);
        break;
      case 3:
        setDashboardScreen('news');
        setCurrentScreen(3);
        break;
    }
  }

  return (
    <>
      <div 
        className={`
          hidden sm:flex justify-between items-center p-3 pl-4 rounded cursor-pointer border-2 border-gray-700 hover:border-gray-600
          ${currentScreen === id ? 'bg-gray-800' : 'bg-gray-700'}
        `}
        onClick={() => changeScreen(false)}
      >
        <span className='font-semibold text-white'>{text}</span>
        <div className='border-2 border-gray-700 rounded'>
          <RoundedButton
            color='gray-800'
            icon={icon}
            square={true}
            hover={false}
          />
        </div>
      </div>
      <div 
        className={`
          sm:hidden flex justify-between items-center p-3 pl-4 rounded border-2 border-gray-700 hover:border-gray-600 cursor-pointer
          ${currentScreen === id ? 'bg-gray-800' : 'bg-gray-700'}
        `}
        onClick={() => changeScreen(true)}
      >
        <span className='font-semibold text-white'>{text}</span>
        <div className='border-2 border-gray-700 rounded'>
          <RoundedButton
            color='gray-800'
            icon={icon}
            square={true}
            hover={false}
          />
        </div>
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
    id:2,
    text:'Expositores',
    icon: faUserCheck
  },
  {
    id:3,
    text:'Noticias',
    icon: faNewspaper
  },
]