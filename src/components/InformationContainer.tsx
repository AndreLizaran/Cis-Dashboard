// Modules
import { ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type Props = {
  children:ReactNode;
  headerColor:string;
  headerText:string;
  headerIcon:IconDefinition;
  maxHeight?:boolean;
}

export default function InformationContainer({ children, headerColor, headerText, headerIcon, maxHeight = true }:Props) {
  return (
    <div className='rounded flex flex-col'>
      <div className={`rounded-t text-white flex justify-between items-center p-4 ${headerColor}`}>
        <h2>{headerText}</h2>
        <FontAwesomeIcon icon={headerIcon}/>
      </div>
      <div className='rounded-b bg-white p-6 drop-shadow'>
        <div 
          className={`flex flex-col gap-6  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 ${maxHeight && 'pr-6'}`} 
          style={maxHeight ? { maxHeight:350 } : {}}
        >
          {children}
        </div>
      </div>
    </div>
  )
}