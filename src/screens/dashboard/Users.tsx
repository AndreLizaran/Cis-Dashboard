import { faPlus } from '@fortawesome/free-solid-svg-icons'
import H2 from '../../components/H2'
import RoundedButton from '../../components/RoundedButton'
import { useUIContext } from '../../hooks/useCustomContext';

export default function Expositores() {
  const { state } = useUIContext();
  const { showDashboardBar } = state;
  return (
    <>
      <div className='flex justify-between items-center mb-6 w-full' style={{ overflowY:'hidden' }}>
        <H2>Usuarios</H2>
        <RoundedButton
          color='red-600'
          square={true}
          icon={faPlus}
          className={`${!showDashboardBar && 'mr-14'}`}
        />
      </div>
    </>
  )
}