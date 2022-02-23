// Modules
import { ReactNode } from 'react'

// Components
import RoundedButton from './RoundedButton';

// Contexts
import { useUIContext } from '../hooks/useCustomContext';

type Props = {
  children: ReactNode;
  saveButtonText: string;
  saveFunction: () => void;
  isLoading?:boolean
}

export default function NewElementForm({ children, saveButtonText, saveFunction, isLoading }:Props) {

  const { state } = useUIContext();
  const { showDashboardBar } = state;

  return (
    <form className='flex flex-col gap-6' onSubmit={(e) => { e.preventDefault(); saveFunction() }}>
      <div className={`flex flex-col md:grid gap-6 ${showDashboardBar ? 'lg:grid-cols-2' : 'md:grid-cols-2'}`}>
        {children}
      </div>
      <RoundedButton text={saveButtonText} color='red-600' type='submit' isLoading={isLoading}/>
    </form>
  )
}
