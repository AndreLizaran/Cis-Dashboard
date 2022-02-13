// Modules
import { useContext } from 'react';
import { 
  faCalendar, 
  faNewspaper, 
  faUser, 
  faBars, 
  faUsers,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

// Classes
import { fadeInLeft, fadeOutLeft } from '../../classes';

// Components
import H2 from '../simple/H2';
import RoundedButton from '../simple/RoundedButton';

// Contexts
import { UIContext } from '../../contexts/UIContext';

// Hooks
import useShowHideAnimation from '../../hooks/useShowHideAnimation';

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
    <div className={`p-6 bg-gray-800 h-screen flex flex-col rounded-r w-full ${animation}`}>
      <div className='flex justify-between items-center mb-6'>
        <H2 className='text-white'>Panel de control</H2>
        <RoundedButton 
          icon={faBars} 
          color='blue-500' 
          action={() => switchAnimation()}
          square={true}
        />
      </div>
      <OptionsList/>
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
  }
}

function OptionElement ({ option }:OptionElementProps) {

  const {
    text,
    icon,
  } = option;

  return (
    <div className='flex justify-between items-center p-3 pl-4 rounded bg-gray-700 border-2 border-gray-700 hover:border-gray-600 cursor-pointer'>
      <span className='font-semibold text-white'>{text}</span>
      <RoundedButton
        color='gray-800'
        icon={icon}
        square={true}
        hover={false}
      />
    </div>
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
    text:'Usuario',
    icon: faUsers
  },
  {
    id:4,
    text:'Expositores',
    icon: faUser
  },
]