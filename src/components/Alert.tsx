// Modules
import { useContext } from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Classes
import { fadeInUp, fadeOutDown } from '../classes';

// Contexts
import { UIContext } from '../contexts/UIContext';

// Hooks
import useShowHideAnimation from '../hooks/useShowHideAnimation';

export default function Alert() {

  const { state, setAlertInformation } = useContext(UIContext);

  const { 
    animation, 
    switchAnimation
  } = useShowHideAnimation(
    fadeInUp, 
    fadeOutDown, 
    state.alert.alert ? true : false, 
    setAlertInformation,
    { alert:'', color:'', cancelable:true }
  );

  const {
    alert
  } = state;

  if (alert.alert) {
    return (
      <div className={`fixed bottom-0 py-6 flex flex-col ${state.showDashboardBar ? 'sm:grid sm:grid-cols-12' : ''} w-full ${animation}`}>
        <div className='sm:col-start-1 sm:col-end-6 lg:col-end-4'/>
        <div className='sm:col-start-6 lg:col-start-4 col-end-13 px-6'>
          <div className='w-full rounded p-4 bg-purple-600 flex justify-between items-center'>
            <span className='text-white font-semibold'>{alert.alert}</span>
            <FontAwesomeIcon icon={faTimes} className='text-white cursor-pointer' onClick={() => switchAnimation()}/>
          </div>
        </div>
      </div>
    )
  } else {
    return <></>
  }
}
