// Modules
import React, { SetStateAction } from 'react'; 

// Components
import RoundedButton from './RoundedButton';

// Icons
import { faImage, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons';
// @ts-ignore
import InputFiles from 'react-input-files';

type Props = {
  img:File | undefined;
  setImg: React.Dispatch<SetStateAction<File | undefined>>
}

export default function FileButton({ img, setImg }:Props) {

  return (
    <div className='flex gap-6 w-full'>
      <InputFiles onChange={(files:FileList) => setImg(files[0]) }>
        <RoundedButton color='blue-500' icon={faUpload} className='w-full'/>
      </InputFiles> 
      {
        img 
        &&
        <>
          <RoundedButton color='gray-300' icon={faImage}/>
          <RoundedButton color='gray-800' icon={faTimes} action={() => setImg(undefined)}/>
        </>
      }
    </div>
  )
}
