import React from 'react'
// @ts-ignore
import InputFiles from 'react-input-files';

// Components
import RoundedButton from '../components/RoundedButton'

// Icons
import { faImage, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'

type Props = {
  image:string;
  processImage:(e:any) => void;
  setImg:(image:string) => void;
  cleanImage:(image:string) => void;
}

export default function ImageButton({ image, processImage, setImg, cleanImage }:Props) {
  return (
    <div className='flex gap-6'>
      <InputFiles onChange={(files:any, event:any) => processImage(event)} style={{ width:'33%' }}>
        <RoundedButton color='blue-500' icon={faUpload} className='w-full'/>
      </InputFiles>
      {image && <RoundedButton color='gray-300' icon={faImage} className='w-4/12' action={() => setImg(image)}/>}
      {image && <RoundedButton color='gray-800' icon={faTimes} className='w-4/12' action={() => cleanImage(image)}/>}
    </div> 
  )
}
