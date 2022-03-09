// Modules
import { Dispatch, ReactNode, SetStateAction } from 'react'

// Components
import RoundedButton from './RoundedButton';

// Contexts
import { useUIContext } from '../hooks/useCustomContext';

type Props = {
  children: ReactNode;
  deleteText: string;
  isLoading?:boolean;
  saveButtonText: string;
  action: 'create' | 'edit';
  setAction: Dispatch<SetStateAction<"create" | "edit">>;
  // Actions
  editAction: () => void;
  cleanAction: () => void;
  deleteAction: () => void
  saveFunction: () => void;
}

export default function NewElementForm({ 
  children, 
  saveButtonText, 
  saveFunction, 
  isLoading, 
  action, 
  setAction, 
  cleanAction, 
  deleteAction, 
  deleteText,
  editAction
}:Props) {

  const { state } = useUIContext();
  const { showDashboardBar } = state;

  return (
    <form className='flex flex-col gap-6' onSubmit={(e) => { e.preventDefault(); action === 'create' ? saveFunction() : editAction() }}>
      <div className={`flex flex-col md:grid gap-6 ${showDashboardBar ? 'lg:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
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
              text={deleteText}
              color='red-600'
              type='button'
              action={() => deleteAction()}
            />
          </>
        }
      </div>
    </form>
  )
}
