// Modules
import { useContext } from 'react';
import { 
  faCalendar, 
  faNewspaper, 
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
import useShowHideAnimation from '../hooks/useShowHideAnimation';
import { useUIContext } from '../hooks/useCustomContext';

export default function DashboardBar() {

  const { switchShowDashboardBar, state } = useContext(UIContext);
  
  const { 
    animation, 
    switchAnimation
  } = useShowHideAnimation(
    fadeInLeft, 
    fadeOutLeft, 
    state.showDashboardBar, 
    switchShowDashboardBar
  );

  return (
    <div className={`p-6 bg-gray-800 h-screen flex flex-col justify-between rounded-r w-full ${animation}`}>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center mb-6'>
          <H2 className='text-white'>Panel de control</H2>
          <RoundedButton
            icon={faBars}
            color='blue-500'
            action={() => switchAnimation()}
            square={true}
          />
        </div>
        <OptionsList switchAnimation={switchAnimation}/>
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

type OptionsListProps = {
  switchAnimation: () => void
}

function OptionsList ({ switchAnimation }:OptionsListProps) {
  return ( 
    <div 
      className={containerClass}>
      {options.map((option) => (
        <OptionElement option={option} key={option.id} switchAnimation={switchAnimation}/>
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
  switchAnimation: () => void;
}

function OptionElement ({ option, switchAnimation }:OptionElementProps) {
  const {
    id,
    text,
    icon,
  } = option;
  const { setDashboardScreen } = useUIContext();
  function changeScreen (hide:boolean) {
    hide && switchAnimation();
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
    id:2,
    text:'Comunicados',
    icon: faNewspaper
  },
  {
    id:3,
    text:'Expositores',
    icon: faUserCheck
  },
]