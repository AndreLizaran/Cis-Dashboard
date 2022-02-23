// Modules
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react'

type Props = {
  img:string;
  setImg: Dispatch<SetStateAction<string>>
}

export default function ImageViewer({ img, setImg }:Props) {
  return (
    <div style={{ zIndex:5 }} className='h-screen w-full flex flex-col items-center justify-center fixed top-0 left-0 bg-black bg-opacity-90'>
      <img className='rounded' src={img} style={{ maxHeight:200 }}/>
      <FontAwesomeIcon icon={faTimes} color='white' className='p-6 cursor-pointer' size='2x' onClick={() => setImg('')}/>
    </div>
  )
}
