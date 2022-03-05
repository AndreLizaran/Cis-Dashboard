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
  setSourceImageViewer: React.Dispatch<SetStateAction<string>>
}

export default function FileButton({ img, setImg, setSourceImageViewer }:Props) {

  function getImageToShow () {
    const reader = new FileReader();
    reader.readAsDataURL(img!);
    reader.onload = () => {
      if (typeof reader.result === 'string') setSourceImageViewer(reader.result);
    }
  }

  return (
    <div className='flex gap-6 w-full'>
      <InputFiles onChange={(files:FileList, event:any) => { setImg(files[0]); event.target.value = null }}>
        <RoundedButton color='blue-500' icon={faUpload} className='w-full'/>
      </InputFiles> 
      { img &&
        <>
          <RoundedButton color='gray-300' icon={faImage} action={() => getImageToShow()}/>
          <RoundedButton color='gray-800' icon={faTimes} action={() => { setImg(undefined); setSourceImageViewer('') }}/>
        </> }
    </div>
  )
}
