// Modules
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Hooks
import { useUIContext } from '../hooks/useCustomContext';

type Props = {
  animation:string;
  switchAnimation: () => void;
}

export default function Alert({ animation, switchAnimation }:Props) {

  const { state:{ showDashboardBar, alert } } = useUIContext();

  if (alert.alert) {
    return (
      <div className={`fixed bottom-0 py-6 flex w-full ${animation}`}>
        <div className={showDashboardBar ? 'sm:w-6/12 md:w-4/12' : ''}></div>
        <div className={`w-full px-6 drop-shadow ${showDashboardBar && 'sm:w-6/12 md:w-8/12' }`}>
          <div className={`w-full rounded p-4 ${alert.color} flex justify-between items-center`}>
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
