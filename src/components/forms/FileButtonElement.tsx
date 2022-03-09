import React from 'react'
import FileButton from '../FileButton'

type Props = {
  labelText:string
  img: File | undefined;
  setImg: React.Dispatch<React.SetStateAction<File | undefined>>;
  setSourceImageViewer: React.Dispatch<React.SetStateAction<string>>
}

// @Author: André Lizarán
// @Date: 05/03/2022
// @Description: Componente para obtener una imagen  

export default function FileButtonElement({ labelText, img, setImg, setSourceImageViewer }:Props) {
  return (
    <div className='flex flex-col'>
      <label className='mb-1'>{labelText}</label>
      <FileButton img={img} setImg={setImg} setSourceImageViewer={setSourceImageViewer}/>
    </div>
  )
}
