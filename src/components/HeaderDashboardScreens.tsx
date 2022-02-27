// Modules
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

// Components
import H2 from '../components/H2'
import RoundedButton from '../components/RoundedButton'

// Hooks
import { useUIContext } from '../hooks/useCustomContext';

type Props = {
  headerText: string;
  action: () => void;
}

export default function HeaderDashboardScreens({ headerText, action }:Props) {

  const { state } = useUIContext();
  const {showDashboardBar  } = state;

  return (
    <div className='flex justify-between items-center mb-6 w-full' style={{ overflowY:'hidden' }}>
      <H2>{headerText}</H2>
      <RoundedButton
        color='red-600'
        square={true}
        icon={faPlus}
        className={`${!showDashboardBar && 'mr-14'}`}
      />
    </div>
  )
}
