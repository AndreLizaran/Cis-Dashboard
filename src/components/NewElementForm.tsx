// Modules
import { Dispatch, ReactNode, SetStateAction } from 'react'

// Components
import RoundedButton from './RoundedButton';

// Contexts
import { useUIContext } from '../hooks/useCustomContext';

type Props = {
  children: ReactNode;
  saveButtonText: string;
  saveFunction: () => void;
  isLoading?:boolean;
  action: 'create' | 'edit';
  cleanAction: () => void;
  setAction: Dispatch<SetStateAction<"create" | "edit">>;
  deleteAction: () => void
  deleteText: string;
}

export default function NewElementForm({ children, saveButtonText, saveFunction, isLoading, action, setAction, cleanAction, deleteAction, deleteText }:Props) {

  const { state } = useUIContext();
  const { showDashboardBar } = state;

  return (
    <form className='flex flex-col gap-6' onSubmit={(e) => { e.preventDefault(); saveFunction() }}>
      <div className={`flex flex-col md:grid gap-6 ${showDashboardBar ? 'lg:grid-cols-2' : 'md:grid-cols-2'}`}>
        {children}
      </div>
      <div className={ action === 'edit' ? 'grid grid-cols-3 gap-6' : 'grid'}>
        <RoundedButton
          text={saveButtonText}
          color='blue-500'
          type='submit'
          isLoading={isLoading}
        />
        {
          action === 'edit'
          &&
          <>
            <RoundedButton
              text='Cancelar edición'
              color='gray-300'
              type='button'
              action={() => {
                setAction('create');
                cleanAction();
              }}
            />
            <RoundedButton
              text={saveButtonText}
              color='red-600'
              type='button'
              isLoading={isLoading}
              action={() => deleteAction()}
            />
          </>
        }
      </div>
    </form>
  )
}
