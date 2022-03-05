type Props = {
  imgSource:string
}

// @Author: André Lizarán
// @Date: 05/03/2022
// @Description: Componente para mostrar expositores

export default function BubbleImage ({ imgSource }:Props) {
  return (
    <img
      src={imgSource}
      style={{ height:60, width:60, borderRadius:100 }}
      className='border border-gray-400 self-center mb-3'
    />
  )
}
